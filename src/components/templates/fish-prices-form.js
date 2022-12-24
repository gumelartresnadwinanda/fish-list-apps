import React, { useContext, useEffect, useState } from 'react';
import { defaultData } from '../../utils/consts';
import { VariableContext } from '../../utils/context';
import { AddFishList, EditFishList } from '../../utils/service';
import { Button } from '../atoms/button';
import Input from '../atoms/input';
import Label from '../atoms/label';
import Select from '../atoms/select';
import Form from '../organisms/form';
import { uuid } from '../../utils/uniqueIDHelper';

function FishPriceForm({ detail, callback, loadingHandler }) {
  const [formData, setFormData] = useState(defaultData);
  const { sizes, areas } = useContext(VariableContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (detail) {
      const { uuid, komoditas, price, size, area_provinsi, area_kota } = detail;
      setFormData({
        uuid,
        komoditas,
        price,
        size,
        area: `${area_kota} - ${area_provinsi}`
      });
    } else {
      setFormData(defaultData);
    }
  }, [detail]);

  const getTimeFormat = () => {
    const currentDate = new Date();
    const offset = -currentDate.getTimezoneOffset();
    const gmt7Date = new Date(currentDate.getTime() + offset * 60000);
    const isoDate = gmt7Date.toISOString();

    return { timestamp: currentDate.getTime(), tgl_parsed: isoDate };
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    const { komoditas, price, size, area } = formData;
    const [area_kota, area_provinsi] = (area || ' - ').split(' - ');
    const { timestamp, tgl_parsed } = getTimeFormat();
    const type = detail ? 'update' : 'create';
    let success = true;
    let data;
    if (detail) {
      const { uuid } = formData;
      data = { 
        uuid,
        komoditas,
        price,
        size,
        area_kota,
        area_provinsi,
        timestamp,
        tgl_parsed
      }
      const search = { uuid: formData.uuid };
      try {
        await EditFishList(search, data);
      } catch(e) {
        success = false;
      }
    } else {
      data = { 
        uuid: uuid(),
        komoditas,
        price,
        size,
        area_kota,
        area_provinsi,
        timestamp,
        tgl_parsed
      }
      try {
        await AddFishList(data);
      } catch (e) {
        success = false;
      }
    }
    setLoading(false);
    if (callback) callback({ success, type, data });
  }

  function handleChange({ name, value }) {
    setFormData({ ...formData, [name]: value });
  }

  return (
    <Form onSubmit={handleSubmit} >
      {
        loading && (
          <div className='overlay'>
            <div className='loading-spinner'/>
          </div>
        )
      }
      <Input
          name="uuid"
          type="hidden"
          value={formData.uuid}
          required
        />
      <Label text="Komoditas">
        <Input
          name="komoditas"
          type="text"
          value={formData.komoditas}
          onChange={handleChange}
          required
        />
      </Label>
      <Label text="Area">
        <Select
          options={[{ value: "", label: 'Pilih Area'}, ...areas]}
          value={formData.area}
          name="area"
          onChange={handleChange}
          required
        />
      </Label>
      <Label text="Harga">
        <Input
          name="price"
          type="tel"
          value={formData.price}
          onChange={handleChange}
          pattern="[0-9]*"
        />
      </Label>
      <Label text="Ukuran">
        <Select
          options={[{ value: '', label: 'Pilih Ukuran Ikan'}, ...sizes]}
          value={formData.size}
          name="size"
          onChange={handleChange}
          required
        />
      </Label>
      <div className='button-container'>
        <Button 
          type="cancel" 
          displayType="tertiery-outline" 
          text="Cancel"
          rounded
        />
        <Button 
          type="submit" 
          displayType="primary" 
          text="Submit"
          rounded 
        />
      </div>
    </Form>
  );
}

export default FishPriceForm;