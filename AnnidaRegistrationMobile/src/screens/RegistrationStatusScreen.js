import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {Button, Platform, ScrollView, Text, TextInput, TouchableOpacity, View, PermissionsAndroid} from "react-native";
import {BASE_URL, MONITORING, REGISTER, RELIGION, SCHOOL_YEAR} from "../constants/api";
import axios from "axios";
import Card from "../components/Card";
import {Controller, useForm} from "react-hook-form";
import moment from "moment";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {Picker} from "@react-native-picker/picker";
import ReactNativeBlobUtil from "react-native-blob-util";
import DocumentPicker, {
  DirectoryPickerResponse,
  DocumentPickerResponse,
  isInProgress,
  types,
} from 'react-native-document-picker';
import {CHILD_STATUS, EDUCATION, OCCUPATION} from "../constants/data";
import Loading from "../components/Loading";


const RegistrationStatusScreen = () => {
  const [birthDateModal, setBirthDateModal] = useState(false);
  const [mutationInModal, setMutationInModal] = useState(false);
  const [mutationOutModal, setMutationOutModal] = useState(false);
  const [religions, setReligions] = useState();
  const [schoolYears, setSchoolYears] = useState();
  const [ticketNumber, setTicketNumber] = useState('');
  const [studentRegistration, setStudentRegistration] = useState();
  const [fetching, setFetching] = useState(false);

  const [firstMount, setFirstMount] = useState(0);

  console.log('[studentRegistration]', studentRegistration?.status)

  const {control, trigger, setValue, getValues, handleSubmit, reset, formState: {errors}} = useForm({
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

  useEffect(() => {
    const getAll = async () => {
      setFetching(true);
      try {
        await Promise.all([getReligions(), getSchoolYears()]);
        setFetching(false);
      } catch (e) {
        setFetching(false)
      }
    }
    getAll();
  },[])

  const requestFolderPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: "Cool File App Directory Permission",
          message:
            "Cool File App needs access to your directory " +
            "so you can take awesome files.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the camera");
        return true;
      } else {
        console.log("Camera permission denied");
        return false;
      }
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  const loadForm = (data) => {
    if (data?.studentRegistration?.fullname)
    {
      setValue('fullname', data?.studentRegistration.fullname)
      setValue('idNumber', data?.studentRegistration.idNumber)
      setValue('nickname', data?.studentRegistration.nickname)
      setValue('birthPlace', data?.studentRegistration.birthPlace)
      setValue('birthDate', new Date(data?.studentRegistration.birthDate))
      setValue('childStatus', data?.studentRegistration.childStatus)

      setValue('religion', data?.studentRegistration.religion.id)
      setValue('gender', data?.studentRegistration.gender)
      setValue('bloodType', data?.studentRegistration.bloodType)

      setValue('address', data?.studentRegistration.address)
      setValue('schoolYear', data?.studentRegistration.schoolYear.id)

      setValue('group', data?.studentRegistration.group)

      setValue('mutationIn', data?.studentRegistration.mutationIn)
      setValue('mutationOut', data?.studentRegistration.mutationOut)
      setValue('mutationOrigin', data?.studentRegistration.mutationOrigin)
      setValue('mutationTo', data?.studentRegistration.mutationTo)


      setValue('fatherName', data?.studentRegistration.fatherName)
      setValue('fatherEducation', data?.studentRegistration.fatherEducation)
      setValue('fatherOccupation', data?.studentRegistration.fatherOccupation)
      setValue('fatherOccupationDesc', data?.studentRegistration.fatherOccupationDesc)
      setValue('fatherAddress', data?.studentRegistration.fatherAddress)


      setValue('motherName', data?.studentRegistration.motherName)
      setValue('motherEducation', data?.studentRegistration.motherEducation)
      setValue('motherOccupation', data?.studentRegistration.motherOccupation)
      setValue('motherOccupationDesc', data?.studentRegistration.motherOccupationDesc)
      setValue('motherAddress', data?.studentRegistration.motherAddress)

      setValue('birthCertificate', data?.studentRegistration.birthCertificate)

      setValue('familyCard', data?.studentRegistration.familyCard)
      setValue('proofOfPayment', data?.studentRegistration.proofOfPayment)

    }
  }

  const getReligions = async() => {
    const result = await axios.get(`${BASE_URL}${RELIGION}`);
    setReligions(result.data?.data)
  }

  const getSchoolYears = async() => {
    const result = await axios.get(`${BASE_URL}${SCHOOL_YEAR}`);
    setSchoolYears(result.data?.data);
  }

  const getRegistrationStatusById = async (id) => {
    try {
      console.log('URL', `${BASE_URL}${MONITORING}/${id}`)
      const response = await axios.get(`${BASE_URL}${MONITORING}/${id}`);
      return response.data;
    } catch (e) {

    }

  }

  const onSubmit = async(data) => {

    let payload = {}
    payload = {
      ...studentRegistration?.studentRegistration,
      ...data,
      birthDate: moment(data.birthDate).format('YYYY-MM-DD'),
      mutationOut: moment(data.mutationOut).format('YYYY-MM-DD'),
      mutationIn: moment(data.mutationIn).format('YYYY-MM-DD'),
      religion: { id: data.religion },
      schoolYear: { id: data.schoolYear }
    }
    console.log('payload', payload)
    const result = await axios.put(`${BASE_URL}${REGISTER}`, payload)
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
      <Loading loading={fetching} />
      <View>
        <View style={{
          flex: 1,
          flexDirection: 'row',
          marginBottom: 16,
        }}>
          <TextInput placeholder={'Masukkan Ticket Number'}
            style={{
              flex: 1,
              borderWidth: 1,
              borderRadius: 4,
              paddingVertical: 6,
              paddingHorizontal: 10,
              backgroundColor: '#fff',
              borderColor: 'rgba(34, 41, 47, 0.4)'
            }}
            onChangeText={(e) => setTicketNumber(e)}
          />
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#0ba644',
              paddingHorizontal: 20,
              paddingVertical: 10,
              marginLeft: 8,
              borderRadius: 10,
            }}
            onPress={async() => {
              setFetching(true)
              try {
                const response = await getRegistrationStatusById(ticketNumber);
                setStudentRegistration(response.data)
                loadForm(response.data);
                setFetching(false)
                setFirstMount(firstMount + 1)
              } catch (e) {
                setFetching(false)
              }
            }}

          >
            <Text style={{color: '#FFF'}}>Cari...</Text>
          </TouchableOpacity>
        </View>
      </View>

      { studentRegistration?.studentRegistration?.fullname &&
        <>
          {
            !studentRegistration?.approvalDoc &&
            <>
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
                          date={new Date(value)}
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
                        <Picker.Item label="SMP" value={1} />
                        <Picker.Item label="SMA" value={2} />
                        <Picker.Item label="S1" value={3} />
                        <Picker.Item label="S2" value={4} />
                        <Picker.Item label="S3" value={5} />
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
                        <Picker.Item label="Lainnya" value={8} />
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
                        <Picker.Item label="SMP" value={1} />
                        <Picker.Item label="SMA" value={2} />
                        <Picker.Item label="S1" value={3} />
                        <Picker.Item label="S2" value={4} />
                        <Picker.Item label="S3" value={5} />
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
                        <Picker.Item label="Sekretaris" value={8} />

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
                    render={({field: {onChange, onBlur, value}}) => {
                      console.log('ajte kelahiran value', value)
                      return (
                        <View>
                          { value &&
                            <TouchableOpacity
                              onPress={async() => {
                                // const isPermission = await requestFolderPermission();
                                if(true) {
                                  ReactNativeBlobUtil.config({
                                    addAndroidDownloads: {
                                      // useDownloadManager: true,
                                      // notification: true,
                                      mime: value.type,
                                    }
                                  })
                                  const LOCATION = ReactNativeBlobUtil.fs.dirs.DownloadDir + '/' + value.name + '1';
                                  await ReactNativeBlobUtil.fs.writeFile(LOCATION, value.file, 'base64')
                                  ReactNativeBlobUtil.android.actionViewIntent(LOCATION, value.type)
                                    .then((results) => {
                                      console.log('SUCCESS')
                                    })
                                    .catch((errors) => {
                                      console.log('errors', errors)
                                    })
                                }
                              }}
                              style={{
                                backgroundColor: '#fff',
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                borderWidth: 1,
                                borderRadius: 4,
                                paddingVertical: 6,
                                paddingHorizontal: 10,
                                borderColor: 'rgba(34, 41, 47, 0.4)',
                                marginBottom: 10,
                              }}

                            >
                              <Text style={{color: '#000'}}>{value && value.name}</Text>
                              <Icon name="download" size={24} color="#900" />
                            </TouchableOpacity>
                          }


                          <Button
                            title="Cari file akte kelahiran"
                            onPress={async () => {
                              try {
                                // const isPermission = await requestFolderPermission();
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
                              } catch (e) {
                                console.log('error DocumentPicker', e)
                                // handleError(e)
                              }
                            }}
                          />
                        </View>
                      )
                    }}
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
                    render={({field: {onChange, onBlur, value}}) => {
                      return (
                        <View>
                          { value &&
                            <TouchableOpacity
                              onPress={async() => {
                                // const isPermission = await requestFolderPermission();
                                ReactNativeBlobUtil.config({
                                  addAndroidDownloads: {
                                    // useDownloadManager: true,
                                    // notification: true,
                                    mime: value.type,
                                  }
                                })
                                const LOCATION = ReactNativeBlobUtil.fs.dirs.DownloadDir + '/' + value.name;
                                await ReactNativeBlobUtil.fs.writeFile(LOCATION, value.file, 'base64')
                                ReactNativeBlobUtil.android.actionViewIntent(LOCATION, value.type)
                                  .then((results) => {
                                    console.log('SUCCESS')
                                  })
                                  .catch((errors) => {
                                    console.log('errors', errors)
                                  })
                              }}
                              style={{
                                backgroundColor: '#fff',
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                borderWidth: 1,
                                borderRadius: 4,
                                paddingVertical: 6,
                                paddingHorizontal: 10,
                                borderColor: 'rgba(34, 41, 47, 0.4)',
                                marginBottom: 10,
                              }}

                            >
                              <Text style={{color: '#000'}}>{value && value.name}</Text>
                              <Icon name="download" size={24} color="#900" />
                            </TouchableOpacity>
                          }
                          <Button
                            title="Cari file kartu keluarga"
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

                              } catch (e) {
                                console.log('error DocumentPicker', e)
                                // handleError(e)
                              }
                            }}
                          />
                        </View>
                      )
                    }}
                    name="familyCard"
                  />
                  {errors.familyCard && <Text style={{color: 'red'}}>This is required.</Text>}
                </View>

              </Card>

              <Card>
                <Text style={{fontWeight: 'bold', color: '#2c2c2c', marginBottom: 29}}>Data Mutasi</Text>
                <View style={{marginBottom: 14}}>
                  <Text style={{fontWeight: 'bold', color: '#2c2c2c', marginBottom: 6}}>Tanggal Masuk Mutasi</Text>
                  <Controller
                    control={control}
                    rules={{
                      required: true,
                    }}
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
                          value={value}
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
                  <Text style={{fontWeight: 'bold', color: '#2c2c2c', marginBottom: 6}}>Tanggal Keluar Mutasi</Text>
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
                            paddingVertical: 20,
                            paddingHorizontal: 10,
                            borderColor: 'rgba(34, 41, 47, 0.4)'
                          }}

                        >
                          <Text>{value && moment(value).format('YYYY-MM-DD')}</Text>
                        </TouchableOpacity>
                        <DateTimePickerModal
                          value={value}
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
                  <Text style={{fontWeight: 'bold', color: '#2c2c2c', marginBottom: 6}}>Pindahan Mutasi Asal</Text>
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
                  <Text style={{fontWeight: 'bold', color: '#2c2c2c', marginBottom: 6}}>Pindahan Mutasi Tujuan</Text>
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
            </>
          }

          {
            !studentRegistration?.approvalPayment && studentRegistration?.approvalDoc &&
            <>
              <Card>
                <Text style={{fontWeight: 'bold', color: '#2c2c2c', marginBottom: 29}}>Dokumen Pembayaran</Text>

                <View style={{marginBottom: 14}}>
                  <Text style={{fontWeight: 'bold', color: '#2c2c2c', marginBottom: 6}}>Foto Transaksi</Text>

                  <Controller
                    control={control}
                    rules={{
                      required: true,
                    }}
                    render={({field: {onChange, onBlur, value}}) => {
                      return (
                        <View>
                          { value &&
                            <TouchableOpacity
                              onPress={async() => {
                                // const isPermission = await requestFolderPermission();
                                if(true) {
                                  ReactNativeBlobUtil.config({
                                    addAndroidDownloads: {
                                      // useDownloadManager: true,
                                      // notification: true,
                                      mime: value.type,
                                    }
                                  })
                                  const LOCATION = ReactNativeBlobUtil.fs.dirs.DownloadDir + '/' + value.name + '1';
                                  await ReactNativeBlobUtil.fs.writeFile(LOCATION, value.file, 'base64')
                                  ReactNativeBlobUtil.android.actionViewIntent(LOCATION, value.type)
                                    .then((results) => {
                                      console.log('SUCCESS')
                                    })
                                    .catch((errors) => {
                                      console.log('errors', errors)
                                    })
                                }
                              }}
                              style={{
                                backgroundColor: '#fff',
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                borderWidth: 1,
                                borderRadius: 4,
                                paddingVertical: 6,
                                paddingHorizontal: 10,
                                borderColor: 'rgba(34, 41, 47, 0.4)',
                                marginBottom: 10,
                              }}

                            >
                              <Text style={{color: '#000'}}>{value && value.name}</Text>
                              <Icon name="download" size={24} color="#900" />
                            </TouchableOpacity>
                          }


                          <Button
                            title="Cari file bukti pembayaran"
                            onPress={async () => {
                              try {
                                // const isPermission = await requestFolderPermission();
                                const res = await DocumentPicker.pickSingle({
                                  presentationStyle: 'fullScreen',
                                  // copyTo: 'cachesDirectory',
                                })
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
                              } catch (e) {
                                console.log('error DocumentPicker', e)
                                // handleError(e)
                              }
                            }}
                          />
                        </View>
                      )
                    }}
                    name="proofOfPayment"
                  />
                  {errors.proofOfPayment && <Text style={{color: 'red'}}>This is required.</Text>}
                </View>
                <Text style={{ marginBottom: 10, fontSize: 10 }}>
                  Selamat data pendaftaran anda telah disetujui, silahkan melakukan pembayaran dengan melakukan transfer ke salah satu dari rekening Yayasan Annida :
                </Text>
                <Text style={{ fontSize: 10 }}>- Bank Mandiri : 123–1111–222–909</Text>
                <Text style={{ fontSize: 10 }}>- Bank BRI : 909–0990–523–282</Text>

              </Card>

              <View style={{marginBottom: 30}}>
                <Button title="Submit" onPress={handleSubmit(onSubmit)} />
              </View>
            </>

          }

          { studentRegistration?.status === 2 &&
            <View>
              <Text>Selamat proses pendaftaran telah selesai 🎉🤞🤞</Text>
              <Text>Selanjutnya anda akan dihubungi via telfon untuk informasi lebih lanjut, terima kasih.</Text>
            </View>
          }
        </>
      }

      {/* { studentRegistration?.status >= 0 && firstMount > 0 &&
        <View style={{height: '100%', flex:1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'red'}}>
          <Text>Data tidak ditemukan :(</Text>
        </View>
      } */}
      
    </ScrollView>
  )
};

export default RegistrationStatusScreen;