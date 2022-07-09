import React from 'react'
import axios from 'axios'
import { FormControl, InputLabel, MenuItem, NativeSelect, Select, InputBase, styled, TextField } from '@mui/material'
import { useState, useEffect } from 'react'

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
              labelId="jenisVaksin"
              id="jenisVaksin"
              name='vaksin1'
              // value={age}
              label="Jenis Vaksin"
              onChange={props.handleChangeVaksin1}
            >
              {props?.dataVaksin?.map((vaksin) => (
              <MenuItem 
                id={vaksin.idVaksin} 
                value={vaksin.idVaksin}>
                <p>{vaksin.nama}</p>
                <p className='hidden'>{vaksin.idVaksin}</p>
              </MenuItem>
              ))}
            </Select>
          </FormControl>
          {/* <p>halo</p> */}
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
        <p className='text-8 text-right text-red'>{props.errorMessage}</p>
      </div>
    </div>
  )
}
