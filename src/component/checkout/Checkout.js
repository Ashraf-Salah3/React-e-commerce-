import { NavLink } from "react-router-dom";
import InputField from "../inputGroup/InputField";
import styles from "./checkout.module.scss";
import { useEffect, useState } from "react";

import instance from "../../axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { CLEAR_CART } from "../../store/cartSlice";

const Checkout = () => {
  const [selectedTown, setSelectedTown] = useState("");
  const [towns, setTowns] = useState([]);
  const [selectedVillage, setSelectedVillage] = useState("");
  const [villages, setVillages] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const dispatch = useDispatch();
 
  const productData = useSelector(state => state.cart.productData)


  const products = productData.map((item) => ({
    productId: item.id,
    productName: item.name,
    quantity: item.quantity,
    sizeId: item.sizeId,
    color: item.color,
    price:item.price,
    imageUrl: item.imageCover
  }));

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await instance.get(
          "Shipping/local-cities"
        );
        setTowns(response.data);
      } catch (error) {
      }
    };
    fetchCities();
  }, []);
  console.log(towns)

  const handleTownChange = async (e) => {
    const { value } = e.target;
    setSelectedTown(value);
    try {
      const response = await instance.get(
        `Shipping/local/city/${value}`
      );

      if (response.status === 200) {
        setVillages(response.data.citiesAndVillages);

     
      } else {
        setVillages([]);
      }
    } catch (error) {}
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await instance.post("/Order", {
        cityId: selectedTown,
        areaId: selectedVillage,
        address: address,
        items: products,
        clientName: name,
        clientPhone: phone,
      });
     toast.success("تم اضافه الطلب بنجاح")
      setAddress("");
      setName("");
      setPhone("");
      setTowns([]);
      setVillages([]);
      dispatch(CLEAR_CART())
    } catch (error) {}
  };

  return (
    <div className="container">
      <div className={styles.checkout}>
        <h1>إتمام عملية الشراء</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles["inputs-group"]}>
            <InputField
              label="الاسم"
              type="text"
              placeholder="الرجاء ادخال الاسم"
              required
              onchange={(e) => setName(e.target.value)}
            />
            <InputField
              label="رقم الهاتف"
              type="text"
              placeholder="الرجاء ادخال الهاتف"
              required
              onchange={(e) => setPhone(e.target.value)}
            />
            <div>
              <InputField
                label="المحافظة"
                id="towns"
                type="select"
                options={[
                  { value: "", label: "اختر المحافظة" },
                  ...towns.map((town) => ({
                    value: town.id,
                    label: town.nameInArabic,
                  })),
                ]}
                onchange={(e) => handleTownChange(e)}
                value={selectedTown}
              />
              <InputField
                label="المدينة"
                id="villages"
                type="select"
                options={
                  selectedTown
                    ? [
                        { value: "", label: "اختر المدينة" },
                        ...villages.map((village) => ({
                          value: village.id,
                          label: village.nameInArabic,
                        })),
                      ]
                    : [{ value: "", label: "الرجاء اختيار المدينة أولاً" }]
                }
                onchange={(e) => setSelectedVillage(e.target.value)}
                value={selectedVillage}
              />
              <p>
                ملاحظة: من المهم ادخال اسم القرية اذا كنت من سكانها لاتمام اسرع
                عملية توصيل
              </p>
            </div>
            <InputField
              label="عنوان تفصيلي"
              type="text"
              placeholder=" الرجاء ادخال عنوان تفصيلي لمنطقة التوصيل"
              required
              onchange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="--btn-action">
            <button className="--btn --btn-primary" type="submit">
              إتمام عملية الشراء
            </button>
            <NavLink to="/cart">
              <button className="--btn"> الرجوع إلى السلة</button>
            </NavLink>
          </div>
        </form>
        <div className={styles.policies}>
          <h2>سياساتنا في العمل:</h2>
          <div className={styles.policiesItem}>
            <div>
              <h3>الدفع والتوصيل:</h3>
              <p>نقوم بايصال المنتج إلى منزلك وتقوم بالدفع لموظف التوصيل.</p>
            </div>
            <div>
              <h3>التبديل:</h3>
              <p>يمكنك تبديل المنتج بسهولة وفقاً لسياساتنا.</p>
            </div>
            <div>
              <h3>إلغاء الطلب:</h3>
              <p>إلغاء الطلب يتم وفق الشروط والأحكام الخاصة بنا.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
