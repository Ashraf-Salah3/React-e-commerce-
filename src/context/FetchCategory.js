import { createContext, useContext, useEffect, useState } from "react";
import instance from "../axios";
import { toast } from "react-toastify";

const categoriesContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState({});

  const fetchCategory = async () => {
    try {
      const response = await instance.get("/Category");
      setCategories(response.data);
      
      const subCategoryRequests = response.data.map((category) =>
        instance.get(`/SubCategory?categoryId=${category.id}`)
      );
      const subCategoryResponses = await Promise.all(subCategoryRequests);
      const newSubCategories = {};
      subCategoryResponses.forEach((subResponse, index) => {
        newSubCategories[response.data[index].id] = subResponse.data;
      });
      setSubCategories(newSubCategories);
    } catch (error) {
    
    }
  };
  useEffect(() => {
    fetchCategory();
  }, []);
  const addCategory = async (newCategory) => {
    try {
      const response = await instance.post("/Category", { name: newCategory });
       if(response.status === 200){
      fetchCategory();
       }
      toast.success("Category added successfully!");
    } catch (error) {
      toast.error(`Error adding category: ${error.message}`);
    }
  };

  const updatedCategory = async (id, newName) => {
    try {
      const response = await instance.put(`/Category/${id}`, { name: newName });
      if (response.status === 200) {
        fetchCategory();
        toast.success("Category updated successfully!");
      }
    } catch (error) {
      toast.error(`Error updating category: ${error.message}`);
    }
  };

  const deleteCategory = async (categoryId) => {
    try {
      await instance.delete(`/Category/${categoryId}`);
      setCategories((prevCategories) =>
        prevCategories.filter((category) => category.id !== categoryId)
      );
      toast.success("Category deleted successfully!");
    } catch (error) {
      toast.error(`Error deleting category: ${error.message}`);
    }
  };
  const AddNewSubCategory = async (categoryId, newSubCategory) => {
    try {
      const subResponse = await instance.post("/SubCategory", {
        name: newSubCategory,
        categoryId,
      });

      setSubCategories((prevSubCategories) => {
        const updatedSubCategories = { ...prevSubCategories };
        if (!updatedSubCategories) {
          updatedSubCategories[categoryId] = [];
        }
        updatedSubCategories[categoryId].push({
          id: subResponse.data.id,
          name: newSubCategory,
        });
        return updatedSubCategories;
      });

      toast.success("SubCategory added successfully!");
    } catch (error) {
      toast.error(`Error adding SubCategory: ${error.message}`);
    }
  };
  const updateSubCategory = async (categoryId, subCategoryId, newName) => {
    try {
      const response = await instance.put(`/SubCategory/${subCategoryId}`, {
        name: newName,
      });
      if (response.status === 200) {
        setSubCategories((prevSubCategories) => {
          const updatedSubCategories = { ...prevSubCategories };
          updatedSubCategories[categoryId] = updatedSubCategories[
            categoryId
          ].map((subCategory) =>
            subCategory.id === subCategoryId
              ? { ...subCategory, name: newName }
              : subCategory
          );
          return updatedSubCategories;
        });
        toast.success("SubCategory updated successfully!");
      }
    } catch (error) {
      toast.error(`Error updating SubCategory: ${error.message}`);
    }
  };

  const deleteSubCategory = async (categoryId, subCategoryId) => {
    if (!categoryId || !subCategoryId) {
      toast.error(
        "Missing categoryId or subCategoryId:",
        categoryId,
        subCategoryId
      );
      return;
    }

    try {
      await instance.delete(`/SubCategory/${subCategoryId}`);
      setSubCategories((prevSubCategories) => {
        const updatedSubCategories = { ...prevSubCategories };
        updatedSubCategories[categoryId] = updatedSubCategories[
          categoryId
        ].filter((subCategory) => subCategory.id !== subCategoryId);
        return updatedSubCategories;
      });
      toast.success("SubCategory deleted successfully!");
    } catch (error) {
      toast.error(`Error deleting SubCategory: ${error.message}`);
    }
  };

  return (
    <categoriesContext.Provider
      value={{
        categories,
        subCategories,
        addCategory,
        updatedCategory,
        deleteCategory,
        updateSubCategory,
        deleteSubCategory,
        AddNewSubCategory,
      }}
    >
      {children}
    </categoriesContext.Provider>
  );
};

export const useFetchCategories = () => {
  const context = useContext(categoriesContext);
  if (context === undefined) {
    throw new Error(
      "useFetchCategories must be used within a CategoryProvider"
    );
  }
  return context;
};
