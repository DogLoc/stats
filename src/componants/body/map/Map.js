import React from "react";
import { VectorMap } from "react-jvectormap";
import Modal from "../modal/Modal";
import { jsx } from "@emotion/core";
import { Popover } from '@varld/popover';
import styled from "@emotion/styled";
import '../../../css/map.scss';

const { getName } = require("country-list");

class Map extends React.Component {
  state = {
    countriesCodesArray: [],
    countriesNamesArray: [],
    data: {},
    dataCovid: {},
    title: "",
    titleSet: false,
    color: "#48aeef",
    popup: {
      isGood: false,
      for: ""
    },

  };

  handleColorChange = color => {
    console.log(color.hex);
    this.setState({ color: color.hex });
  };

  handleClick = (e, countryCode) => {
    const { countriesCodesArray } = this.state;

    if (countriesCodesArray.indexOf(countryCode) === -1) {
      this.setState(
        {
          countriesCodesArray: [...countriesCodesArray, countryCode]
        },
        () => this.getCountriesNamesList()
      );
    }
    
  };

  getCountriesNamesList = () => {
    const { countriesCodesArray } = this.state;
    const list = countriesCodesArray;
    fetch(`https://coronavirus-map.p.rapidapi.com/v1/summary/region?region=${getName(list[list.length - 1])}`, {
      "method": "GET",
      "headers": {
        "x-rapidapi-key": "9ad6965570msh263b6eabf12b69fp1ae439jsn82a313ffee62",
        "x-rapidapi-host": "coronavirus-map.p.rapidapi.com"
      }
    })
      .then(response => {
        const promiseCovid = response.json(Promise.resolve());
        promiseCovid.then((value) => {
          const dataCovid = value.data.summary;
          this.setState({
            isLoaded: true,
            dataCovid: dataCovid,
            countriesNamesArray: list,
            popup: {
              isGood: true,
              for: getName(list[list.length - 1])
            }
          },
            () => this.makeMapDataStructure()
          );
        });

      })
      .catch(err => {
        console.error(err);
      })

  };

  makeMapDataStructure = () => {
    const { countriesCodesArray } = this.state;
    let obj = {};
    //{CN: 5, MX: 5, TX: 5}
    countriesCodesArray.forEach(countryCode => (obj[countryCode] = 5));
    this.setState({
      data: obj
    });
  };

  render() {

    const { countriesNamesArray, data, dataCovid, color, popup } = this.state;

    return (
      <div>

        {popup.isGood ? <Modal
          country={popup.for}
          deaths={dataCovid.deaths}
          tested={dataCovid.tested}
          active_cases={dataCovid.active_cases}
          critical={dataCovid.critical}
          death_ratio={dataCovid.death_ratio}
          recovered={dataCovid.recovered}
          recovery_ratio={dataCovid.recovery_ratio}
          total_cases={dataCovid.total_cases}
        /> : ""}

        <VectorMap
          map={"world_mill"}
          backgroundColor="transparent" // change it to ocean blue: #0077be
          zoomOnScroll={false}
          containerStyle={{
            width: "100%",
            height: "520px"
          }}
          onRegionClick={this.handleClick} // gets the country code
          containerClassName="map"
          regionStyle={{
            initial: {
              fill: "#e0e0e0"
            },
            hover: {
              fill: "#870000",
              cursor: 'pointer'
            }
          }}
          regionsSelectable={false}
          series={{
            regions: [
              {
                values: dataCovid, // this is the map data
                scale: ["#146804", color], // your color game's here
                normalizeFunction: "polynomial"
              }
            ]
          }}
        />
      </div>
    );
  }
}

export default Map;


