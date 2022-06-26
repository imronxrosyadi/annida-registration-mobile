import React, {useState, useEffect} from 'react';
import {Button, Platform, ScrollView, Text, TextInput, TouchableOpacity, View} from "react-native";
import {useForm, Controller} from "react-hook-form";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {Picker} from '@react-native-picker/picker';
import DocumentPicker, {
  DirectoryPickerResponse,
  DocumentPickerResponse,
  isInProgress,
  types,
} from 'react-native-document-picker';
import Card from "../components/Card";
import ReactNativeBlobUtil from "react-native-blob-util";
import moment from "moment";
import {BASE_URL, REGISTER, RELIGION, SCHOOL_YEAR} from "../constants/api";
import axios from "axios";

const RegistrationScreen = () => {
  const [birthDateModal, setBirthDateModal] = useState(false);
  const [mutationInModal, setMutationInModal] = useState(false);
  const [mutationOutModal, setMutationOutModal] = useState(false);
  const [religions, setReligions] = useState();
  const [schoolYears, setSchoolYears] = useState();

  useEffect(() => {
    getReligions();
    getSchoolYears();
  },[])

  const getReligions = async() => {
    const result = await axios.get(`${BASE_URL}${RELIGION}`);
    setReligions(result.data.data)
  }

  const getSchoolYears = async() => {
    const result = await axios.get(`${BASE_URL}${SCHOOL_YEAR}`);
    setSchoolYears(result.data.data);
  }


  const {control, trigger, getValues, handleSubmit, reset, formState: {errors}} = useForm({
    mode: 'all',
    shouldFocusError: true,
    defaultValues: {
      idNumber: '',
      fullname: '',
      nickname: '',
      birthPlace: '',
      birthDate: null,
      gender: '',
      bloodType: '',
      childStatus: '',
      address: '',

      fatherName: '',
      fatherEducation: '',
      fatherOccupation: '',
      fatherOccupationDesc: null,
      fatherAddress: '',

      motherName: '',
      motherEducation: '',
      motherOccupation: '',
      motherOccupationDesc: null,
      motherAddress: '',

      mutationIn: null,
      mutationOut: null,
      mutationOrigin: '',
      mutationTo: '',
      schoolYear: null,
      religion: null,

      group: '',
      birthCertificate: null,
      familyCard: null,

      proofOfPayment: null,

    }
  });



  const onSubmit = async(data) => {
    let payload = {}
    payload = {
      ...data,
      birthDate: moment(data.birthDate).format('YYYY-MM-DD'),
      mutationOut: moment(data.mutationOut).format('YYYY-MM-DD'),
      mutationIn: moment(data.mutationIn).format('YYYY-MM-DD'),
      religion: { id: data.religion },
      schoolYear: { id: data.schoolYear }
    }
    console.log(payload)
    const result = await axios.post(`${BASE_URL}${REGISTER}`, payload)
    console.log('result', result.data)
  };
  const onError = data => {
    console.log(data)
  };


  return (
    <ScrollView style={{
      paddingHorizontal: 10,
      paddingTop: 10
    }}>
        <Card>
          <Text style={{fontWeight: 'bold', color: '#2c2c2c', marginBottom: 29}}>Data Diri Calon Pendaftar</Text>

          <View style={{marginBottom: 14}}>
            <Text style={{fontWeight: 'bold', color: '#2c2c2c', marginBottom: 6}}>NIK</Text>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  style={{
                    borderWidth: 1,
                    borderRadius: 4,
                    paddingVertical: 6,
                    paddingHorizontal: 10,
                    borderColor: 'rgba(34, 41, 47, 0.4)'
                  }}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="idNumber"
            />
            {errors.idNumber && <Text style={{color: 'red'}}>This is required.</Text>}
          </View>

          <View style={{marginBottom: 14}}>
            <Text style={{fontWeight: 'bold', color: '#2c2c2c', marginBottom: 6}}>Nama Lengkap</Text>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  style={{
                    borderWidth: 1,
                    borderRadius: 4,
                    paddingVertical: 6,
                    paddingHorizontal: 10,
                    borderColor: 'rgba(34, 41, 47, 0.4)'
                  }}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="fullname"
            />
            {errors.fullname && <Text style={{color: 'red'}}>This is required.</Text>}
          </View>

          <View style={{marginBottom: 14}}>
            <Text style={{fontWeight: 'bold', color: '#2c2c2c', marginBottom: 6}}>Nama Panggil</Text>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  style={{
                    borderWidth: 1,
                    borderRadius: 4,
                    paddingVertical: 6,
                    paddingHorizontal: 10,
                    borderColor: 'rgba(34, 41, 47, 0.4)'
                  }}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="nickname"
            />
            {errors.nickname && <Text style={{color: 'red'}}>This is required.</Text>}
          </View>

          <View style={{marginBottom: 14}}>
            <Text style={{fontWeight: 'bold', color: '#2c2c2c', marginBottom: 6}}>Tempat Lahir</Text>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  style={{
                    borderWidth: 1,
                    borderRadius: 4,
                    paddingVertical: 6,
                    paddingHorizontal: 10,
                    borderColor: 'rgba(34, 41, 47, 0.4)'
                  }}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="birthPlace"
            />
            {errors.birthPlace && <Text style={{color: 'red'}}>This is required.</Text>}
          </View>

          <View style={{marginBottom: 14}}>
            <Text style={{fontWeight: 'bold', color: '#2c2c2c', marginBottom: 6}}>Tanggal Lahir</Text>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <>
                  <TouchableOpacity
                    onPress={() => {
                      setBirthDateModal(true)
                    }}
                    style={{
                      borderWidth: 1,
                      borderRadius: 4,
                      paddingVertical: 10,
                      paddingHorizontal: 10,
                      borderColor: 'rgba(34, 41, 47, 0.4)'
                    }}
                  >
                    <Text>{value && moment(value).format('YYYY-MM-DD')}</Text>
                  </TouchableOpacity>
                  <DateTimePickerModal
                    date={value || new Date()}
                    isVisible={birthDateModal}
                    mode="date"
                    onConfirm={(e) => {
                      onChange(e)
                      setBirthDateModal(false)
                    }}
                    onCancel={() => {
                      setBirthDateModal(false)
                    }}
                  />
                </>
              )}
              name="birthDate"
            />
            {errors.birthDate && <Text style={{color: 'red'}}>This is required.</Text>}
          </View>

          <View style={{marginBottom: 14}}>
            <Text style={{fontWeight: 'bold', color: '#2c2c2c', marginBottom: 6}}>Agama</Text>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <Picker
                  selectedValue={value}
                  style={{
                    borderWidth: 1,
                    borderRadius: 4,
                    borderColor: 'rgba(34, 41, 47, 0.4)'
                  }}
                  onValueChange={(itemValue, itemIndex) => {
                    onChange(itemValue)
                    console.log('onValueChange', itemValue)
                  }}>
                  { religions?.map((religion, index) => {
                    return (
                      <Picker.Item key={index} label={religion.name} value={religion.id} />
                    )
                  })}
                </Picker>
              )}
              name="religion"
            />
            {errors.religion && <Text style={{color: 'red'}}>This is required.</Text>}
          </View>

          <View style={{marginBottom: 14}}>
            <Text style={{fontWeight: 'bold', color: '#2c2c2c', marginBottom: 6}}>Jenis Kelamin</Text>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <Picker
                  selectedValue={value}
                  style={{
                    borderWidth: 1,
                    borderRadius: 4,
                    borderColor: 'rgba(34, 41, 47, 0.4)'
                  }}
                  onValueChange={(itemValue, itemIndex) =>
                    onChange(itemValue)
                  }>
                  <Picker.Item label="Laki-laki" value="L"/>
                  <Picker.Item label="Perempuan" value="P"/>
                </Picker>
              )}
              name="gender"
            />
            {errors.gender && <Text style={{color: 'red'}}>This is required.</Text>}
          </View>

          <View style={{marginBottom: 14}}>
            <Text style={{fontWeight: 'bold', color: '#2c2c2c', marginBottom: 6}}>Golongan Darah</Text>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <Picker
                  selectedValue={value}
                  style={{
                    borderWidth: 1,
                    borderRadius: 4,
                    borderColor: 'rgba(34, 41, 47, 0.4)'
                  }}
                  onValueChange={(itemValue, itemIndex) =>
                    onChange(itemValue)
                  }>
                  <Picker.Item label="A" value="A"/>
                  <Picker.Item label="B" value="B"/>
                  <Picker.Item label="AB" value="AB"/>
                  <Picker.Item label="O" value="O"/>
                </Picker>
              )}
              name="bloodType"
            />
            {errors.bloodType && <Text style={{color: 'red'}}>This is required.</Text>}
          </View>

          <View style={{marginBottom: 14}}>
            <Text style={{fontWeight: 'bold', color: '#2c2c2c', marginBottom: 6}}>Status Anak</Text>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <Picker
                  selectedValue={value}
                  style={{
                    borderWidth: 1,
                    borderRadius: 4,
                    borderColor: 'rgba(34, 41, 47, 0.4)'
                  }}
                  onValueChange={(itemValue, itemIndex) =>
                    onChange(itemValue)

                  }>
                  <Picker.Item label="Anak Kandung" value={1}/>
                  <Picker.Item label="Anak Angkat" value={2}/>
                  <Picker.Item label="Anak Diluar nikah" value={3}/>
                </Picker>
              )}
              name="childStatus"
            />
            {errors.childStatus && <Text style={{color: 'red'}}>This is required.</Text>}
          </View>

          <View style={{marginBottom: 14}}>
            <Text style={{fontWeight: 'bold', color: '#2c2c2c', marginBottom: 6}}>Alamat</Text>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  style={{
                    borderWidth: 1,
                    borderRadius: 4,
                    paddingVertical: 6,
                    paddingHorizontal: 10,
                    borderColor: 'rgba(34, 41, 47, 0.4)'
                  }}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="address"
            />
            {errors.address && <Text style={{color: 'red'}}>This is required.</Text>}
          </View>

          <View style={{marginBottom: 14}}>
            <Text style={{fontWeight: 'bold', color: '#2c2c2c', marginBottom: 6}}>Tahun Ajar</Text>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <Picker
                  selectedValue={''}
                  style={{
                    borderWidth: 1,
                    borderRadius: 4,
                    borderColor: 'rgba(34, 41, 47, 0.4)'
                  }}
                  onValueChange={(itemValue, itemIndex) =>
                    onChange(itemValue)
                  }>
                  { schoolYears?.map((schoolYear, index) => {
                    return (
                      <Picker.Item key={index} label={schoolYear.content} value={schoolYear.id} />
                    )
                  })}
                </Picker>
              )}
              name="schoolYear"
            />
            {errors.schoolYear && <Text style={{color: 'red'}}>This is required.</Text>}
          </View>

          <View style={{marginBottom: 14}}>
            <Text style={{fontWeight: 'bold', color: '#2c2c2c', marginBottom: 6}}>Grup</Text>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <Picker
                  selectedValue={value}
                  style={{
                    borderWidth: 1,
                    borderRadius: 4,
                    borderColor: 'rgba(34, 41, 47, 0.4)'
                  }}
                  onValueChange={(itemValue, itemIndex) =>
                    onChange(itemValue)
                  }>
                  <Picker.Item label="TK A" value={"TK A"}/>
                  <Picker.Item label="TK B" value={"TK B"}/>
                  <Picker.Item label="TK C" value={"TK C"}/>
                </Picker>
              )}
              name="group"
            />
            {errors.group && <Text style={{color: 'red'}}>This is required.</Text>}
          </View>

          <View style={{marginBottom: 14}}>
            <Text style={{fontWeight: 'bold', color: '#2c2c2c', marginBottom: 6}}>Tanggal masuk</Text>
            <Controller
              control={control}
              // rules={{
              //   required: true,
              // }}
              render={({field: {onChange, onBlur, value}}) => (
                <>
                  <TouchableOpacity
                    onPress={() => {
                      setMutationInModal(true)
                    }}
                    style={{
                      borderWidth: 1,
                      borderRadius: 4,
                      paddingVertical: 10,
                      paddingHorizontal: 10,
                      borderColor: 'rgba(34, 41, 47, 0.4)'
                    }}

                  >
                    <Text>{value && moment(value).format('YYYY-MM-DD')}</Text>
                  </TouchableOpacity>
                  <DateTimePickerModal
                    date={value || new Date()}
                    isVisible={mutationInModal}
                    mode="date"
                    onConfirm={(e) => {
                      console.log('onConfirm', e)
                      onChange(e)
                      setMutationInModal(false)
                    }}
                    onCancel={() => {
                      setMutationInModal(false)
                    }}
                  />
                </>
              )}
              name="mutationIn"
            />
            {errors.mutationIn && <Text style={{color: 'red'}}>This is required.</Text>}
          </View>

          <View style={{marginBottom: 14}}>
            <Text style={{fontWeight: 'bold', color: '#2c2c2c', marginBottom: 6}}>Tanggal keluar</Text>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <>
                  <TouchableOpacity
                    onPress={() => {
                      setMutationOutModal(true)
                    }}
                    style={{
                      borderWidth: 1,
                      borderRadius: 4,
                      paddingVertical: 10,
                      paddingHorizontal: 10,
                      borderColor: 'rgba(34, 41, 47, 0.4)'
                    }}

                  >
                    <Text>{value && moment(value).format('YYYY-MM-DD')}</Text>
                  </TouchableOpacity>
                  <DateTimePickerModal
                    date={value || new Date()}
                    isVisible={mutationOutModal}
                    mode="date"
                    onConfirm={(e) => {
                      console.log('onConfirm', e)
                      onChange(e)
                      setMutationOutModal(false)
                    }}
                    onCancel={() => {
                      setMutationOutModal(false)
                    }}
                  />
                </>
              )}
              name="mutationOut"
            />
            {errors.birthDate && <Text style={{color: 'red'}}>This is required.</Text>}
          </View>


          <View style={{marginBottom: 14}}>
            <Text style={{fontWeight: 'bold', color: '#2c2c2c', marginBottom: 6}}>Pindah dari</Text>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  style={{
                    borderWidth: 1,
                    borderRadius: 4,
                    paddingVertical: 6,
                    paddingHorizontal: 10,
                    borderColor: 'rgba(34, 41, 47, 0.4)'
                  }}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="mutationOrigin"
            />
            {errors.mutationOrigin && <Text style={{color: 'red'}}>This is required.</Text>}
          </View>


          <View style={{marginBottom: 14}}>
            <Text style={{fontWeight: 'bold', color: '#2c2c2c', marginBottom: 6}}>Pindah ke</Text>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  style={{
                    borderWidth: 1,
                    borderRadius: 4,
                    paddingVertical: 6,
                    paddingHorizontal: 10,
                    borderColor: 'rgba(34, 41, 47, 0.4)'
                  }}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="mutationTo"
            />
            {errors.mutationTo && <Text style={{color: 'red'}}>This is required.</Text>}
          </View>


        </Card>

        <Card>
          <Text style={{fontWeight: 'bold', color: '#2c2c2c', marginBottom: 29}}>Data Orang Tua</Text>

          <View style={{marginBottom: 14}}>
            <Text style={{fontWeight: 'bold', color: '#2c2c2c', marginBottom: 6}}>Nama Ayah</Text>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  style={{
                    borderWidth: 1,
                    borderRadius: 4,
                    paddingVertical: 6,
                    paddingHorizontal: 10,
                    borderColor: 'rgba(34, 41, 47, 0.4)'
                  }}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="fatherName"
            />
            {errors.fatherName && <Text style={{color: 'red'}}>This is required.</Text>}
          </View>

          <View style={{marginBottom: 14}}>
            <Text style={{fontWeight: 'bold', color: '#2c2c2c', marginBottom: 6}}>Alamat Ayah</Text>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  style={{
                    borderWidth: 1,
                    borderRadius: 4,
                    paddingVertical: 6,
                    paddingHorizontal: 10,
                    borderColor: 'rgba(34, 41, 47, 0.4)'
                  }}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="fatherAddress"
            />
            {errors.fatherAddress && <Text style={{color: 'red'}}>This is required.</Text>}
          </View>

          <View style={{marginBottom: 14}}>
            <Text style={{fontWeight: 'bold', color: '#2c2c2c', marginBottom: 6}}>Pendidikan Ayah</Text>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <Picker
                  selectedValue={value}
                  style={{
                    borderWidth: 1,
                    borderRadius: 4,
                    borderColor: 'rgba(34, 41, 47, 0.4)'
                  }}
                  onValueChange={(itemValue, itemIndex) =>
                    onChange(itemValue)
                  }>
                  <Picker.Item label="SMA" value={1} />
                  <Picker.Item label="S1" value={2} />
                  <Picker.Item label="S2" value={3} />
                  <Picker.Item label="S3" value={4} />
                </Picker>
              )}
              name="fatherEducation"
            />
            {errors.fatherEducation && <Text style={{color: 'red'}}>This is required.</Text>}
          </View>

          <View style={{marginBottom: 14}}>
            <Text style={{fontWeight: 'bold', color: '#2c2c2c', marginBottom: 6}}>Pekerjaan Ayah</Text>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <Picker
                  selectedValue={value}
                  style={{
                    borderWidth: 1,
                    borderRadius: 4,
                    borderColor: 'rgba(34, 41, 47, 0.4)'
                  }}
                  onValueChange={(itemValue, itemIndex) =>
                    onChange(itemValue)

                  }>
                  <Picker.Item label="Wirausaha" value={1} />
                  <Picker.Item label="Dokter" value={2} />
                  <Picker.Item label="Polisi" value={3} />
                  <Picker.Item label="Guru" value={4} />
                  <Picker.Item label="Tentara" value={5} />
                  <Picker.Item label="Ibu Rumah Tangga" value={6} />
                  <Picker.Item label="Sekretaris" value={7} />

                </Picker>
              )}
              name="fatherOccupation"
            />
            {errors.fatherOccupation && <Text style={{color: 'red'}}>This is required.</Text>}
          </View>

          <View style={{marginBottom: 14}}>
            <Text style={{fontWeight: 'bold', color: '#2c2c2c', marginBottom: 6}}>Deskripsi Pekerjaan Ayah</Text>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  style={{
                    borderWidth: 1,
                    borderRadius: 4,
                    paddingVertical: 6,
                    paddingHorizontal: 10,
                    borderColor: 'rgba(34, 41, 47, 0.4)'
                  }}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="fatherOccupationDesc"
            />
            {errors.fatherOccupationDesc && <Text style={{color: 'red'}}>This is required.</Text>}
          </View>



          {/* Mother Section */}
          <View style={{marginBottom: 14}}>
            <Text style={{fontWeight: 'bold', color: '#2c2c2c', marginBottom: 6}}>Nama Ibu</Text>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  style={{
                    borderWidth: 1,
                    borderRadius: 4,
                    paddingVertical: 6,
                    paddingHorizontal: 10,
                    borderColor: 'rgba(34, 41, 47, 0.4)'
                  }}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="motherName"
            />
            {errors.motherName && <Text style={{color: 'red'}}>This is required.</Text>}
          </View>

          <View style={{marginBottom: 14}}>
            <Text style={{fontWeight: 'bold', color: '#2c2c2c', marginBottom: 6}}>Alamat Ibu</Text>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  style={{
                    borderWidth: 1,
                    borderRadius: 4,
                    paddingVertical: 6,
                    paddingHorizontal: 10,
                    borderColor: 'rgba(34, 41, 47, 0.4)'
                  }}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="motherAddress"
            />
            {errors.motherAddress && <Text style={{color: 'red'}}>This is required.</Text>}
          </View>

          <View style={{marginBottom: 14}}>
            <Text style={{fontWeight: 'bold', color: '#2c2c2c', marginBottom: 6}}>Pendidikan Ibu</Text>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <Picker
                  selectedValue={value}
                  style={{
                    borderWidth: 1,
                    borderRadius: 4,
                    borderColor: 'rgba(34, 41, 47, 0.4)'
                  }}
                  onValueChange={(itemValue, itemIndex) =>
                    // setSelectedLanguage(itemValue)
                    // console.log('onValueChange', itemValue)
                    onChange(itemValue)

                  }>
                  <Picker.Item label="SMA" value={1} />
                  <Picker.Item label="S1" value={2} />
                  <Picker.Item label="S2" value={3} />
                  <Picker.Item label="S3" value={4} />
                </Picker>
              )}
              name="motherEducation"
            />
            {errors.motherEducation && <Text style={{color: 'red'}}>This is required.</Text>}
          </View>

          <View style={{marginBottom: 14}}>
            <Text style={{fontWeight: 'bold', color: '#2c2c2c', marginBottom: 6}}>Pekerjaan Ibu</Text>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <Picker
                  selectedValue={value}
                  style={{
                    borderWidth: 1,
                    borderRadius: 4,
                    borderColor: 'rgba(34, 41, 47, 0.4)'
                  }}
                  onValueChange={(itemValue, itemIndex) =>
                    // setSelectedLanguage(itemValue)
                    // console.log('onValueChange', itemValue)
                    onChange(itemValue)
                  }>
                  <Picker.Item label="Wirausaha" value={1} />
                  <Picker.Item label="Dokter" value={2} />
                  <Picker.Item label="Polisi" value={3} />
                  <Picker.Item label="Guru" value={4} />
                  <Picker.Item label="Tentara" value={5} />
                  <Picker.Item label="Ibu Rumah Tangga" value={6} />
                  <Picker.Item label="Sekretaris" value={7} />

                </Picker>
              )}
              name="motherOccupation"
            />
            {errors.motherOccupation && <Text style={{color: 'red'}}>This is required.</Text>}
          </View>

          <View style={{marginBottom: 14}}>
            <Text style={{fontWeight: 'bold', color: '#2c2c2c', marginBottom: 6}}>Deskripsi Pekerjaan Ibu</Text>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  style={{
                    borderWidth: 1,
                    borderRadius: 4,
                    paddingVertical: 6,
                    paddingHorizontal: 10,
                    borderColor: 'rgba(34, 41, 47, 0.4)'
                  }}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="motherOccupationDesc"
            />
            {errors.motherOccupationDesc && <Text style={{color: 'red'}}>This is required.</Text>}
          </View>


        </Card>

        <Card>
          <Text style={{fontWeight: 'bold', color: '#2c2c2c', marginBottom: 29}}>Dokumen</Text>

          <View style={{marginBottom: 14}}>
            <Text style={{fontWeight: 'bold', color: '#2c2c2c', marginBottom: 6}}>Akte kelahiran</Text>

            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <Button
                  title="Cari file akte kelahiran"
                  onPress={async () => {
                    try {
                      const res = await DocumentPicker.pickSingle({
                        presentationStyle: 'fullScreen',
                        // copyTo: 'cachesDirectory',
                      })
                      console.log('result DocumentPicker', res)
                      const fileType = res.type;
                      if (fileType) {
                        const fileExtension = fileType.substr(fileType.indexOf('/') + 1);
                        const realURI = Platform.select({
                          android: res.uri,
                          ios: decodeURI(res.uri),
                        });
                        if (realURI) {
                          const b64 = await ReactNativeBlobUtil.fs.readFile(
                            realURI,
                            'base64',
                          );
                          onChange({
                            file: b64,
                            name: res.name,
                            type: res.type
                          })
                          console.log('base64', b64)
                        } else {
                          throw new Error('Failed to process file');
                        }
                      } else {
                        throw new Error('Failed to process file');
                      }

                      // setResult([pickerResult])
                    } catch (e) {
                      console.log('error DocumentPicker', e)
                      // handleError(e)
                    }
                  }}
                />
              )}
              name="birthCertificate"
            />
            {errors.birthCertificate && <Text style={{color: 'red'}}>This is required.</Text>}
          </View>

          <View style={{marginBottom: 14}}>
            <Text style={{fontWeight: 'bold', color: '#2c2c2c', marginBottom: 6}}>Kartu keluarga</Text>

            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <Button
                  title="Cari file akte kelahiran"
                  onPress={async () => {
                    try {
                      const res = await DocumentPicker.pickSingle({
                        presentationStyle: 'fullScreen',
                        // copyTo: 'cachesDirectory',
                      })
                      console.log('result DocumentPicker', res)
                      const fileType = res.type;
                      if (fileType) {
                        const fileExtension = fileType.substr(fileType.indexOf('/') + 1);
                        const realURI = Platform.select({
                          android: res.uri,
                          ios: decodeURI(res.uri),
                        });
                        if (realURI) {
                          const b64 = await ReactNativeBlobUtil.fs.readFile(
                            realURI,
                            'base64',
                          );
                          onChange({
                            file: b64,
                            name: res.name,
                            type: res.type
                          })
                        } else {
                          throw new Error('Failed to process file');
                        }
                      } else {
                        throw new Error('Failed to process file');
                      }

                      // setResult([pickerResult])
                    } catch (e) {
                      console.log('error DocumentPicker', e)
                      // handleError(e)
                    }
                  }}
                />
              )}
              name="familyCard"
            />
            {errors.familyCard && <Text style={{color: 'red'}}>This is required.</Text>}
          </View>

        </Card>



        <Button title="Submit" onPress={handleSubmit(onSubmit)} />



    </ScrollView>
  )
};

export default RegistrationScreen;