import React from 'react'
import { FormControl, InputLabel, MenuItem, NativeSelect, Select, InputBase, styled, TextField } from '@mui/material'
import { useState } from 'react'

export const FormTiketVaksin = (props) => {



  return (
    <div className=''>
      <h1 className="text-20 font-600 mb-36">Pilih Jenis Vaksin</h1>
      <div className=''>
        <div className='flex flex-row justify-center'>
          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel id="jenisVaksin1">Jenis Vaksin</InputLabel>
            <Select
              required
              labelId="jenisVaksin1"
              id="jenisVaksin1"
              name='vaksin1'
              // value={age}
              label="Jenis Vaksin"
              onChange={props.handleChangeVaksin1}
            >
              {props.dataVaksin.map((vaksin) => (
              <MenuItem 
                id={vaksin.idVaksin} 
                value={vaksin.nama}>
                {vaksin.nama}
              </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, width: 85 }}>
            {/* <InputLabel id="stokVaksin1">Stok</InputLabel> */}
            <TextField
              required
              labelId="stokVaksin1"
              id="stokVaksin1"
              label="Stok"
              name='stokVaksin1'
              type="number"
              // value={tanggalAwal}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={props.handleChangeVaksin1}
            />
          </FormControl>
        </div>
      </div>
    </div>
  )
}
