import axios from "axios";
import { serverPython, server } from "../index";

export const Prediction = (file, id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        // 'Content-type': 'application/json',
        "content-type": "multipart/form-data",
      },
      // Credential: true,
    };

    const formData = new FormData();
    formData.append("file", file);
    dispatch({ type: "predictionRequest" });

    const { data } = await axios.post(
      `${serverPython}/api/v1/predict`,
      formData,
      config
    );
    formData.append("result", data.result);
    formData.append("probability", data.probability);

    dispatch({ type: "predictionSuccess", payload: data });
    const { user } = await axios.put(
      `${server}/uploadimage/${id}`,
      formData,
      config
    );
  } catch (error) {
    dispatch({ type: "predictionFail", payload: error.response.data.message });
  }
};
