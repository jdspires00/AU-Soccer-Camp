import React, { Component } from 'react';
import { Button } from 'primereact/button';

class UploadButton extends Component{

  handleFileUpload = (event) => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.json';
    fileInput.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        this.readFile(file);
      }
    };
    fileInput.click();
  };

  readFile = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      JSON.parse(reader.result, (err, data) => {
        var userList = [];
        for (var i = 0; i < data.length; i++) {
          const coach = data[i][0];
          const camper = data[i][1];
          const newUser = { "coach": coach, "camper": camper };
          userList.push(newUser);
          fetch('https://au-soccer-camp/CampInfo.csv', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser)
          });
        }
      });
    };
    reader.readAsBinaryString(file);
  };

  render() {
    const wellStyles = { maxWidth: 400, margin: '0 auto 10px' };
    const fontSize = 5;

    return (
      <div align="center" oncontextmenu="return false">
        <div>
          <h1>Upload CSV</h1>
          <div className="well" style={wellStyles}>
            <Button
              label="Upload CSV"
              icon="pi pi-upload"
              iconPos="right"
              className="p-button-raised p-button-rounded"
              onClick={this.handleFileUpload}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default UploadButton;