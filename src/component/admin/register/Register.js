import styles from "./register.module.scss";
import { useEffect, useState } from "react";
import instance from "../../../axios";
import { toast } from "react-toastify";
import InputField from "../../inputGroup/InputField";
import {
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Table } from "react-bootstrap";

const Register = () => {
  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    Mobile: "",
    Email: "",
    Password: "",
    ConfirmPassword: "",
    Image: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await instance.get("/Account");
      setUsers(response.data.data.items);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handelInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handelFormSubmit = async (e) => {
    e.preventDefault();
    const formDatas = new FormData();
    formDatas.append("FirstName", formData.FirstName);
    formDatas.append("LastName", formData.LastName);
    formDatas.append("Password", formData.Password);
    formDatas.append("ConfirmPassword", formData.ConfirmPassword);
    formDatas.append("Email", formData.Email);
    formDatas.append("Mobile", formData.Mobile);
    formDatas.append("Image", null);
    if (formData.Password !== formData.ConfirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setIsSubmitting(true);
    try {
      await instance.post("/Account/register", formDatas, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("User created successfully");
      fetchUsers();
      setFormData({
        FirstName: "",
        LastName: "",
        Mobile: "",
        Email: "",
        Password: "",
        ConfirmPassword: "",
        Image: null,
      });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Registration failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handelDeletedUser = async (id) => {
    try {
     await instance.delete(`/Account/${id}`);
      toast.success("user Is Deleted");
      fetchUsers();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className={styles.register}>
      <div className={styles.auth}>
        <h2>Create New Account</h2>
        <form onSubmit={handelFormSubmit}>
          <div className={styles.inputGroup}>
            <InputField
              label="First Name"
              id="FirstName"
              type="text"
              placeholder="Enter First Name"
              required
              value={formData.FirstName}
              onchange={handelInputChange}
            />
            <InputField
              label="Last Name"
              id="LastName"
              type="text"
              placeholder="Enter Last Name"
              required
              value={formData.LastName}
              onchange={handelInputChange}
            />
          </div>
          <div className={styles.inputGroup}>
            <InputField
              label="Password"
              id="Password"
              type="password"
              placeholder="Enter your password"
              required
              value={formData.Password}
              onchange={handelInputChange}
            />
            <InputField
              label="Confirm Password"
              id="ConfirmPassword"
              type="password"
              placeholder="Confirm Password"
              required
              value={formData.ConfirmPassword}
              onchange={handelInputChange}
            />
          </div>
          <div className={styles.inputGroup}>
            <InputField
              label="Email Address"
              id="Email"
              type="email"
              placeholder="Enter your Email"
              required
              value={formData.Email}
              onchange={handelInputChange}
            />

            <InputField
              label="Mobile"
              id="Mobile"
              type="text"
              placeholder="Enter your Mobile"
              required
              value={formData.Mobile}
              onchange={handelInputChange}
            />
          </div>

          <div className="--btn-action">
            <button
              type="submit"
              className="--btn --btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Create Account"}
            </button>
          </div>
        </form>
      </div>
      {users ? (
        <TableContainer component={Paper} className={styles.tableContainer}>
          <Table className="table table-striped table-hover">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>
                  <div>id</div>
                </TableCell>
                <TableCell>
                  {" "}
                  <div>Name</div>
                </TableCell>
                <TableCell>
                  {" "}
                  <div>Mobile</div>
                </TableCell>
                <TableCell>
                  {" "}
                  <div>Email</div>
                </TableCell>
                <TableCell>
                  {" "}
                  <div>Delete</div>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users?.map((user, index) => (
                <TableRow key={user.id} className={styles.tableRow}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{user.id.slice(0, 9)}</TableCell>
                  <TableCell>{user.firstName +" "+ user.lastName}</TableCell>
                  <TableCell>{user.mobile}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell className={styles.delete}>
                    <button
                      className="--btn --btn-danger"
                      onClick={() => handelDeletedUser(user.id)}
                    >
                      Delete
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        ""
      )}
    </div>
  );
};

export default Register;
