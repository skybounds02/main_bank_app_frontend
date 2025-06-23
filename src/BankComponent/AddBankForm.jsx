import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const AddBankForm = () => {
  const [bankUsers, setBankUsers] = useState([]);

  const admin_jwtToken = sessionStorage.getItem("admin-jwtToken");

  let navigate = useNavigate();

  const retrieveAllBankUsers = async () => {
    try {
      const response = await axios.get(
        "https://bankapi.skybound02.online/api/user/fetch/bank/managers",
        {
          headers: {
            Authorization: "Bearer " + admin_jwtToken, // Replace with your actual JWT token
          },
        }
      );
      return response.data;
    } catch (error) {
      // Handle any errors here
      console.error("Error fetching bank managers:", error);
      throw error;
    }
  };

  useEffect(() => {
    const getAllBankUsers = async () => {
      const allBankUsers = await retrieveAllBankUsers();
      if (allBankUsers) {
        setBankUsers(allBankUsers.users);
      }
    };

    getAllBankUsers();
  }, []);

  const [bank, setBank] = useState({
    name: "",
    code: "",
    address: "",
    phoneNumber: "",
    email: "",
    website: "",
    country: "",
    currency: "",
    userId: "",
  });

  const handleInput = (e) => {
    setBank({ ...bank, [e.target.name]: e.target.value });
  };

  const saveBank = (e) => {
    fetch("https://bankapi.skybound02.online/api/bank/register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + admin_jwtToken,
      },
      body: JSON.stringify(bank),
    })
      .then((result) => {
        console.log("result", result);
        result.json().then((res) => {
          console.log(res);

          if (res.success) {
            console.log("Got the success response");

            toast.success(res.responseMessage, {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });

            setTimeout(() => {
              window.location.reload(true);
            }, 1000); // Redirect after 3 seconds
          } else {
            console.log("Didn't got success response");
            toast.error("It seems server is down", {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            setTimeout(() => {
              window.location.reload(true);
            }, 1000); // Redirect after 3 seconds
          }
        });
      })
      .catch((error) => {
        console.error(error);
        toast.error("It seems server is down", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setTimeout(() => {
          window.location.reload(true);
        }, 1000); // Redirect after 3 seconds
      });
    e.preventDefault();
  };

  return (
    <div>
      <div className="mt-2 d-flex aligns-items-center justify-content-center">
        <div
          className="card form-card border-color custom-bg"
          style={{ width: "50rem" }}
        >
          <div className="card-header bg-color custom-bg-text text-center">
            <h5 className="card-title">Add Bank</h5>
          </div>
          <div className="card-body text-color">
            <form className="row g-3">
              <div className="col-md-6 mb-3">
                <label htmlFor="name" className="form-label">
                  <b>Bank Name</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  onChange={handleInput}
                  value={bank.name}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="code" className="form-label">
                  <b>Bank Code</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="code"
                  name="code"
                  onChange={handleInput}
                  value={bank.code}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">
                  <b>Bank Manager</b>
                </label>
                <select
                  name="userId"
                  onChange={handleInput}
                  className="form-control"
                >
                  <option value="">Select Bank Manager</option>

                  {bankUsers.map((user) => {
                    return <option value={user.id}>{user.name}</option>;
                  })}
                </select>
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="website" className="form-label">
                  <b>Website</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="website"
                  name="website"
                  onChange={handleInput}
                  value={bank.website}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="address" className="form-label">
                  <b>Bank Address</b>
                </label>
                <textarea
                  className="form-control"
                  id="address"
                  name="address"
                  rows="3"
                  onChange={handleInput}
                  value={bank.address}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="quantity" className="form-label">
                  <b>Bank Email</b>
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  onChange={handleInput}
                  value={bank.email}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="phoneNumber" className="form-label">
                  <b>Phone Number</b>
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="phoneNumber"
                  name="phoneNumber"
                  onChange={handleInput}
                  value={bank.phoneNumber}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="country" className="form-label">
                  <b>Country</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="country"
                  name="country"
                  onChange={handleInput}
                  value={bank.country}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="currency" className="form-label">
                  <b>Currency</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="currency"
                  name="currency"
                  onChange={handleInput}
                  value={bank.currency}
                />
              </div>

              <div className="d-flex aligns-items-center justify-content-center">
                <button
                  type="submit"
                  className="btn bg-color custom-bg-text col-md-4"
                  onClick={saveBank}
                >
                  Register Bank
                </button>
                <ToastContainer />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBankForm;
