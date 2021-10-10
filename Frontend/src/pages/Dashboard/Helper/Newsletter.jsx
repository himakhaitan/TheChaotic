import React, { useEffect, useState } from "react";
import classes from "./helper.module.css";
import axios from "axios";
import variable from "../../../config/variables";
import Overlay from "../../../components/UI/Overlay/Overlay";
import { essentialAction } from "../../../store/slice/essential";
import { useDispatch } from "react-redux";
import { IoIosCloseCircleOutline, IoIosCopy } from "react-icons/io";

const NewsletterData = () => {
  const dispatch = useDispatch();
  const [newsLetterData, setNewsLetterData] = useState([]);
  const [overlay, setOverlay] = useState({
    on: false,
    message: null,
  });
  const overlayClose = () => {
    setOverlay({
      on: false,
      message: null,
    });
  };
  useEffect(() => {
    const fetchData = async () => {
      dispatch(essentialAction.toggleSpinner());
      const response = await axios.get(
        `${variable.serverURL}/connect/newsletter/all`
      );
      if (!response.data.success) {
        setOverlay({
          on: true,
          message: response.data.message,
        });
      } else {
        setNewsLetterData(response.data.newsletter);
      }
      dispatch(essentialAction.toggleSpinner());
    };
    fetchData();
  }, [dispatch]);

  const deleteNewsletter = async (id, index) => {
    dispatch(essentialAction.toggleSpinner());
    const response = await axios.get(
      `${variable.serverURL}/connect/newsletter/${id}`
    );
    if (response.data) {
      setOverlay({
        on: true,
        message: response.data.message,
      });
      if (response.data.success) {
        setNewsLetterData((prev) => {
          let arr = prev;
          arr.splice(index, 1);
          return arr;
        });
      }
    }
    dispatch(essentialAction.toggleSpinner());
  };
  const emailClipboard = async (email) => {
    navigator.clipboard.writeText(email);
  };
  return (
    <div className={classes.main}>
      <table className={classes.table}>
        <thead>
          <tr>
            <th className={classes.th}>Serial No.</th>
            <th className={classes.th}>E-mail Address</th>
          </tr>
        </thead>
        <tbody>
          {newsLetterData.length !== 0 &&
            newsLetterData.map((item, index) => {
              return (
                <tr key={item._id}>
                  <td className={classes.td}>{index + 1}</td>
                  <td className={classes.td + " " + classes.tdDiv}>
                    <p>
                      <a href={`mailto:${item.email}`}>{item.email}</a>
                    </p>
                    <p className={classes.iconDiv}>
                      <IoIosCopy
                        className={classes.copyIcon}
                        onClick={() => emailClipboard(item.email)}
                      />
                      <IoIosCloseCircleOutline
                        className={classes.closeIcon}
                        onClick={() => deleteNewsletter(item._id, index)}
                      />
                    </p>
                  </td>
                </tr>
              );
            })}
          {newsLetterData.length === 0 && (
            <tr className={classes.null}>
              <td>No Newsletter Signup Found!</td>
            </tr>
          )}
        </tbody>
      </table>

      {overlay.on && (
        <Overlay onClick={overlayClose} message={overlay.message} />
      )}
    </div>
  );
};

export default NewsletterData;
