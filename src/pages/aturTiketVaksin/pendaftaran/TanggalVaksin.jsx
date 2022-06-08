import React from "react";
import TextField from '@mui/material/TextField';

export const TanggalVaksin = () => {
  return (
    <div>
      <div className="p-5">
        <TextField
          id="date"
          label="Masukan Tanggal Awal"
          type="date"
          defaultValue="2022-05-06"
          // value={tanggalAwal}
          sx={{ width: 220 }}
          InputLabelProps={{
            shrink: true,
          }}
          // onChange={handleSubmit}
        />
      </div>
      <div className="p-5">
        <TextField
          id="date"
          label="Masukan Tanggal Awal"
          type="date"
          defaultValue="2022-05-06"
          // value={tanggalAkhir}
          sx={{ width: 220 }}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
    </div>
  );
};
