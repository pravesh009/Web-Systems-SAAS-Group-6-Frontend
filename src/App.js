import React from "react";
import axios from "axios";
import LoadingSpin from "react-loading-spin";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";

class ReactUploadImage extends React.Component {
  notify = () =>
    toast.success("The file is successfully uploaded!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      labels: null,
      isLoading: false,
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  onFormSubmit(e) {
    this.setState({ isLoading: true });
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", this.state.file);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    axios
      .post("https://web-systems-gae-2-node.wn.r.appspot.com/upload", formData, config)
      .then((response) => {
        console.log("Success", response);
        this.setState({ labels: response.data.data });
        // alert("The file is successfully uploaded");
        this.setState({ isLoading: false });
        this.notify();
      })
      .catch((error) => {
        this.setState({ isLoading: false });
      });
  }
  onChange(e) {
    this.setState({ file: e.target.files[0] });
  }
  

  render() {
    return (
      <div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          // theme="dark"
        />
        {this.state.isLoading ? (
          <LoadingSpin />
        ) : (
          <div>
            <form onSubmit={this.onFormSubmit}>
              <h1>File Upload</h1>
              <input type="file" name="myImage" onChange={this.onChange} />
              <button type="submit">Upload</button>
              {!this.state.labels ? (
                <></>
              ) : (
                <>
                  <h3>Labels:</h3>
                  <ul>
                    {this.state.labels.map((label) => {
                      return (
                        <li key={label.description}>{label.description}</li>
                      );
                    })}
                  </ul>
                </>
              )}
            </form>
          </div>
        )}
      </div>
    );
  }
}

export default ReactUploadImage;
