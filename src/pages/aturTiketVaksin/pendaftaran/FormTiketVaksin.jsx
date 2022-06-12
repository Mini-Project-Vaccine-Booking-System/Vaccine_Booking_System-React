import React from 'react'
import { FormControl, InputLabel, MenuItem, NativeSelect, Select, InputBase, styled, TextField } from '@mui/material'
import { useState } from 'react'

export const FormTiketVaksin = () => {

  const vaksin = [
    'Sinovac',
    'Pfizer',
    'Moderna',
    'AstraZeneca'
  ]

  const [vaksin1, setVaksin1] = useState({
    vaksin1: "",
    stokVaksin1: ""
  })
  
  const [vaksin2, setVaksin2] = useState({
    vaksin2: "",
    stokVaksin2: ""
  })

  const handleChangeVaksin1 = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setVaksin1({
      ...vaksin1, [name]: value
    })
  }
  console.log("cek vaksin 1", vaksin1)


  const handleChangeVaksin2 = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setVaksin2({
      ...vaksin2, [name]: value
    })
  }
  console.log("cek vaksin 2", vaksin2)

  return (
    <div>
      <h1>Pilih Jenis Vaksin</h1>
      <div>
        <div className='flex flex-row'>
          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="jenisVaksin1">Jenis Vaksin</InputLabel>
            <Select
              labelId="jenisVaksin1"
              id="jenisVaksin1"
              name='vaksin1'
              // value={age}
              label="Jenis Vaksin"
              onChange={handleChangeVaksin1}
            >
              {vaksin.map((vaksin) => (
              <MenuItem 
                id={vaksin} 
                value={vaksin}>
                {vaksin}
              </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, width: 85 }}>
            {/* <InputLabel id="stokVaksin1">Stok</InputLabel> */}
            <TextField
              labelId="stokVaksin1"
              id="stokVaksin1"
              label="Stok"
              name='stokVaksin1'
              type="number"
              // value={tanggalAwal}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleChangeVaksin1}
            />
          </FormControl>
        </div>


        <div className='flex flex-row'>
          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="jenisVaksin2">Jenis Vaksin</InputLabel>
            <Select
              labelId="jenisVaksin2"
              id="jenisVaksin2"
              name='vaksin2'
              // value={age}
              label="Jenis Vaksin"
              onChange={handleChangeVaksin2}
            >
              {vaksin.map((vaksin) => (
              <MenuItem 
                id={vaksin} 
                value={vaksin}>
                {vaksin}
              </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, width: 85 }}>
            {/* <InputLabel id="stokVaksin1">Stok</InputLabel> */}
            <TextField
              labelId="stokVaksin2"
              id="stokVaksin2"
              label="Stok"
              name='stokVaksin2'
              type="number"
              // value={tanggalAwal}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleChangeVaksin2}
            />
          </FormControl>
        </div>
      </div>
    </div>
  )
}
