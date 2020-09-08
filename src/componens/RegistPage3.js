
import React, { Component } from 'react';
import { Image, TouchableOpacity, Text, Platform, StatusBar, View, SafeAreaView, TextInput, Alert, ActivityIndicator, Modal, RefreshControl, BackHandler } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';
import BlinkingIcon from './BlinkingIcon';
import AwesomeButton from "react-native-really-awesome-button";
import AsyncStorage from '@react-native-community/async-storage';
import { Dropdown } from 'react-native-material-dropdown';
import SearchableDropDown from 'react-native-searchable-dropdown';
import SearchableDropDown2 from 'react-native-searchable-dropdown';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
var styles = require('../utils/Styles');
var GLOBAL = require('../utils/Helper');
import UnAuth from './UnauthPage';
import renderIf from './Renderif';

import {
    Menu,
    MenuOption,
    MenuOptions,
    MenuTrigger,
    renderers,
    MenuProvider
} from 'react-native-popup-menu';
const option1 = [{ label: 'Sesuai Alamat KTP', value: '1' }, { label: 'Tambah Alamat Lain', value: '2' }];
const option2 = [{ label: 'Sesuai Alamat KTP', value: '1' }, { label: 'Sesuai Alamat Domisili', value: '2' }, { label: 'Tambah Alamat Lain', value: '3' }];
const { Popover } = renderers;

class RegistPage3 extends React.Component {

    constructor(props) {
        super(props);
        this.field1 = React.createRef();
        this.field2 = React.createRef();
        this.field3 = React.createRef();
        this.field4 = React.createRef();
        this.field5 = React.createRef();
        this.field6 = React.createRef();
        this.field7 = React.createRef();
        this.state = {
            isLoading: false,
            screenHeight: 0,
            openFormAlamatSurat: false,
            openFormAlamatDomisili: false,
            myToken: '',
            kotaValue: '',
            alamatValue: '',
            kotaIdValue: '',
            provinsiValue: '',
            negaraValue: '',
            kodePosValue: '',
            alamatDomValue: '',
            kotaDomValue: '',
            kotaDomIdValue: '',
            provinsiDomValue: '',
            negaraDomValue: '',
            kodePosDomValue: '',
            alamatSuratValue: '',
            indexAlamatSurat: '0',
            indexAlamatDom: '0',
            pendidikanValue: '',
            pendidikanId: '',
            pendidikanInput: false,
            pendidikanText: '',
            pekerjaanValue: '',
            pekerjaanText: '',
            pekerjaanInput: false,
            pekerjaanId: '',
            penghasilanValue: '',
            penghasilanId: '',
            sumberdanaValue: '',
            sumberdanaId: '',
            sumberdanaInput: false,
            sumberdanaText: '',
            tujInvestValue: '',
            tujInvestId: '',
            tujInvestInput: false,
            tujInvestText: '',
            dataKota: [],
            dataPekerjaan: [],
            dataPendidikan: [],
            dataPenghasilan: [],
            dataTujInvest: [],
            dataSumberdana: [],
            refreshing: false,
            dataKotaOption: [],
            modalVisibleUnAuth: false,
            viewBlink: true,
            addHeight: false,
        }
    }
    Unauthorized() {
        this.setState({ isLoading: false, modalVisibleUnAuth: true })
        setTimeout(() => this.logout(), GLOBAL.timeOut);
    }
    logout = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Main')
    }
    onPreviuos = () => {
        this.props.navigation.navigate('Regist2');
    }
    onNext = () => {
        if (this.state.alamatValue.length == 0) {
            Alert.alert('Perhatian', 'Alamat sesuai KTP tidak boleh kosong',
                [{
                    text: 'OK',
                    onPress: () => {
                        const textInput = this.field1.current;
                        textInput.focus()
                    }
                }],
                { cancelable: false },
            );
        } else if (this.state.kotaValue.length == 0 || this.state.kotaValue == "Pilih Kota" || this.state.kotaIdValue == "") {
            Alert.alert('Perhatian', 'Pilihan kota tidak tersedia',
                [{
                    text: 'OK',
                    onPress: () => {
                        const textInput = this.field2.current;
                        textInput.focus()
                    }
                }],
                { cancelable: false },
            );
        } else if (this.state.provinsiValue.length == 0) {
            Alert.alert('Perhatian', 'Provinsi sesuai KTP tidak boleh kosong',
                [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
                { cancelable: false },
            );
        } else if (this.state.negaraValue.length == 0) {
            Alert.alert('Perhatian', 'Negara sesuai KTP tidak boleh kosong',
                [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
                { cancelable: false },
            );
        } else if (this.state.kodePosValue.length == 0) {
            Alert.alert('Perhatian', 'Kode pos sesuai KTP tidak boleh kosong',
                [{
                    text: 'OK',
                    onPress: () => {
                        const textInput = this.field3.current;
                        textInput.focus()
                    }
                }],
                { cancelable: false },
            );
        } else if (!this.state.kodePosValue.match(GLOBAL.numbersFormat)) {
            Alert.alert('Perhatian', 'Kode pos sesuai KTP tidak valid',
                [{
                    text: 'OK',
                    onPress: () => {
                        const textInput = this.field3.current;
                        textInput.focus()
                    }
                }],
                { cancelable: false },
            );
        } else if (this.state.indexAlamatDom == '0') {
            Alert.alert('Perhatian', 'Alamat domisili tidak boleh kosong',
                [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
                { cancelable: false },
            );
        } else if (this.state.indexAlamatDom == '2' && this.state.alamatDomValue.length == 0) {
            Alert.alert('Perhatian', 'Alamat domisili tidak boleh kosong',
                [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
                { cancelable: false },
            );
        } else if (this.state.kotaDomValue.length == 0 || this.state.kotaDomValue == "Pilih Kota" || this.state.kotaDomIdValue == "") {
            Alert.alert('Perhatian', 'Pilihan kota domisili tidak tersedia',
                [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
                { cancelable: false },
            );
        } else if (this.state.provinsiDomValue.length == 0) {
            Alert.alert('Perhatian', 'Provinsi domisili tidak boleh kosong',
                [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
                { cancelable: false },
            );
        } else if (this.state.negaraDomValue.length == 0) {
            Alert.alert('Perhatian', 'Negara domisili tidak boleh kosong',
                [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
                { cancelable: false },
            );
        } else if (this.state.indexAlamatDom == '2' && this.state.kodePosDomValue.length == 0) {
            Alert.alert('Perhatian', 'Kode pos domisili tidak boleh kosong',
                [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
                { cancelable: false },
            );
        } else if (!this.state.kodePosDomValue.match(GLOBAL.numbersFormat)) {
            Alert.alert('Perhatian', 'Kode pos domisili tidak valid',
                [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
                { cancelable: false },
            );
        } else if (this.state.indexAlamatSurat == '0') {
            Alert.alert('Perhatian', 'Alamat surat menyurat tidak boleh kosong',
                [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
                { cancelable: false },
            );
        } else if (this.state.indexAlamatSurat == '3' && this.state.alamatSuratValue.length == 0) {
            Alert.alert('Perhatian', 'Alamat surat menyurat tidak boleh kosong',
                [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
                { cancelable: false },
            );
        } else if (this.state.pendidikanValue.length == 0) {
            Alert.alert('Perhatian', 'Pendidikan tidak boleh kosong',
                [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
                { cancelable: false },
            );
        } else if (this.state.pendidikanValue == "Lainnya" && this.state.pendidikanText.length == 0) {
            Alert.alert('Perhatian', 'Pendidikan tidak boleh kosong',
                [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
                { cancelable: false },
            );
        } else if (this.state.pekerjaanValue.length == 0) {
            Alert.alert('Perhatian', 'Pekerjaan tidak boleh kosong',
                [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
                { cancelable: false },
            );
        } else if (this.state.pekerjaanValue == "Lainnya" && this.state.pekerjaanText.length == 0) {
            Alert.alert('Perhatian', 'Pekerjaan tidak boleh kosong',
                [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
                { cancelable: false },
            );
        } else if (this.state.penghasilanValue.length == 0) {
            Alert.alert('Perhatian', 'Penghasilan tidak boleh kosong',
                [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
                { cancelable: false },
            );
        } else if (this.state.sumberdanaValue.length == 0) {
            Alert.alert('Perhatian', 'Sumberdana tidak boleh kosong',
                [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
                { cancelable: false },
            );
        } else if (this.state.sumberdanaValue == "Lainnya" && this.state.sumberdanaText.length == 0) {
            Alert.alert('Perhatian', 'Sumberdana tidak boleh kosong',
                [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
                { cancelable: false },
            );
        } else if (this.state.tujInvestValue.length == 0) {
            Alert.alert('Perhatian', 'Tujuan investasi tidak boleh kosong',
                [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
                { cancelable: false },
            );
        } else if (this.state.tujInvestValue == "Lainnya" && this.state.tujInvestText.length == 0) {
            Alert.alert('Perhatian', 'Tujuan investasi tidak boleh kosong',
                [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
                { cancelable: false },
            );
        } else {
            AsyncStorage.setItem('alamatValue', this.state.alamatValue);
            AsyncStorage.setItem('kotaIdValue', '' + this.state.kotaIdValue);
            AsyncStorage.setItem('kotaValue', this.state.kotaValue);
            AsyncStorage.setItem('provinsiValue', this.state.provinsiValue);
            AsyncStorage.setItem('negaraValue', this.state.negaraValue);
            AsyncStorage.setItem('kodePosValue', this.state.kodePosValue);
            AsyncStorage.setItem('indexAlamatDom', this.state.indexAlamatDom);
            AsyncStorage.setItem('alamatDomValue', this.state.alamatDomValue);
            AsyncStorage.setItem('kotaDomIdValue', '' + this.state.kotaDomIdValue);
            AsyncStorage.setItem('kotaDomValue', this.state.kotaDomValue);
            AsyncStorage.setItem('provinsiDomValue', this.state.provinsiDomValue);
            AsyncStorage.setItem('negaraDomValue', this.state.negaraDomValue);
            AsyncStorage.setItem('kodePosDomValue', this.state.kodePosDomValue);
            AsyncStorage.setItem('indexAlamatSurat', this.state.indexAlamatSurat);
            AsyncStorage.setItem('alamatSuratValue', this.state.alamatSuratValue);
            AsyncStorage.setItem('pendidikanValue', this.state.pendidikanValue);
            AsyncStorage.setItem('pendidikanId', '' + this.state.pendidikanId);
            AsyncStorage.setItem('pendidikanText', this.state.pendidikanText);
            AsyncStorage.setItem('pekerjaanValue', this.state.pekerjaanValue);
            AsyncStorage.setItem('pekerjaanId', '' + this.state.pekerjaanId);
            AsyncStorage.setItem('pekerjaanText', this.state.pekerjaanText);
            AsyncStorage.setItem('penghasilanValue', this.state.penghasilanValue);
            AsyncStorage.setItem('penghasilanId', '' + this.state.penghasilanId);
            AsyncStorage.setItem('sumberdanaValue', this.state.sumberdanaValue);
            AsyncStorage.setItem('sumberdanaId', '' + this.state.sumberdanaId);
            AsyncStorage.setItem('sumberdanaText', this.state.sumberdanaText);
            AsyncStorage.setItem('tujInvestValue', this.state.tujInvestValue);
            AsyncStorage.setItem('tujInvestId', '' + this.state.tujInvestId);
            AsyncStorage.setItem('tujInvestText', this.state.tujInvestText);
            this.props.navigation.navigate('Regist4')

        }
    }
    onKotaSelected = async (isSelect, isKotaType) => {
        var kotaMap = this.state.dataKota;
        var kota = kotaMap.map((kotaMap, key) => kotaMap);
        for (var i = 0; i < kota.length; i++) {
            if (kota[i].value == isSelect) {
                if (isKotaType == '1') {
                    this.setState({
                        kotaIdValue: kota[i].id,
                        provinsiValue: kota[i].provinsi,
                        negaraValue: kota[i].negara,
                        kotaValue: kota[i].value,
                    })
                } else {
                    this.setState({
                        kotaDomIdValue: kota[i].id,
                        provinsiDomValue: kota[i].provinsi,
                        negaraDomValue: kota[i].negara,
                        kotaDomValue: kota[i].value,
                    })
                }
            }
        }
    }
    onPendSelected(isSelect) {
        var pendMap = this.state.dataPendidikan;
        var pend = pendMap.map((pendMap, key) => pendMap);
        for (var i = 0; i < pend.length; i++) {
            if (pend[i].value == isSelect) {
                this.setState({
                    pendidikanId: pend[i].id,
                    pendidikanValue: pend[i].value,
                });
                if (pend[i].value == "Lainnya") {
                    this.setState({ pendidikanInput: true })
                } else {
                    this.setState({ pendidikanInput: false, pendidikanText: '' })
                }
            }
        }
    }
    onPekSelected(isSelect) {
        var pekMap = this.state.dataPekerjaan;
        var pek = pekMap.map((pekMap, key) => pekMap);
        for (var i = 0; i < pek.length; i++) {
            if (pek[i].value == isSelect) {
                this.setState({
                    pekerjaanId: pek[i].id,
                    pekerjaanValue: pek[i].value,
                });
                if (pek[i].value == "Lainnya") {
                    this.setState({ pekerjaanInput: true })
                } else {
                    this.setState({ pekerjaanInput: false, pekerjaanText: '' })
                }
            }
        }
    }

    onSumberSelected(isSelect) {
        var sumMap = this.state.dataSumberdana;
        var sum = sumMap.map((sumMap, key) => sumMap);
        for (var i = 0; i < sum.length; i++) {
            if (sum[i].value == isSelect) {
                this.setState({
                    sumberdanaId: sum[i].id,
                    sumberdanaValue: sum[i].value,
                });
                if (sum[i].value == "Lainnya") {
                    this.setState({ sumberdanaInput: true })
                } else {
                    this.setState({ sumberdanaInput: false, sumberdanaText: '' })
                }
            }
        }
    }
    onPengSelected(isSelect) {
        var pengMap = this.state.dataPenghasilan;
        var peng = pengMap.map((pengMap, key) => pengMap);
        for (var i = 0; i < peng.length; i++) {
            if (peng[i].value == isSelect) {
                this.setState({
                    penghasilanId: peng[i].id,
                    penghasilanValue: peng[i].value
                })
            }
        }
    }
    onTujSelected(isSelect) {
        var tujMap = this.state.dataTujInvest;
        var tuj = tujMap.map((tujMap, key) => tujMap);
        for (var i = 0; i < tuj.length; i++) {
            if (tuj[i].value == isSelect) {
                this.setState({
                    tujInvestId: tuj[i].id,
                    tujInvestValue: tuj[i].value,
                });
                if (tuj[i].value == "Lainnya") {
                    this.setState({ tujInvestInput: true })
                } else {
                    this.setState({ tujInvestInput: false, tujInvestText: '' })
                }
            }
        }
    }
    onSetPilAlamatDomisili(isOpen) {
        switch (isOpen) {
            case '1':
                if (this.state.alamatValue.length == 0) {
                    this.setState({ indexAlamatDom: '0' })
                    Alert.alert('Perhatian', 'Alamat sesuai KTP tidak boleh kosong',
                        [{
                            text: 'OK',
                            onPress: () => {
                                const textInput = this.field1.current;
                                textInput.focus()
                            }
                        }],
                        { cancelable: false },
                    );
                } else if (this.state.kotaValue.length == 0 || this.state.kotaValue == "Pilih Kota" || this.state.kotaIdValue == "") {
                    this.setState({ indexAlamatDom: '0' })
                    Alert.alert('Perhatian', 'Pilihan kota tidak tersedia',
                        [{
                            text: 'OK',
                            onPress: () => {
                                const textInput = this.field2.current;
                                textInput.focus()
                            }
                        }],
                        { cancelable: false },
                    );
                } else if (this.state.kodePosValue.length == 0) {
                    this.setState({ indexAlamatDom: '0' })
                    Alert.alert('Perhatian', 'Kode pos sesuai KTP tidak boleh kosong',
                        [{
                            text: 'OK',
                            onPress: () => {
                                const textInput = this.field3.current;
                                textInput.focus()
                            }
                        }],
                        { cancelable: false },
                    );
                } else {
                    this.setState({ indexAlamatDom: isOpen })
                    this.setState({
                        alamatDomValue: this.state.alamatValue,
                        kotaDomValue: this.state.kotaValue,
                        kotaDomIdValue: this.state.kotaIdValue,
                        provinsiDomValue: this.state.provinsiValue,
                        negaraDomValue: this.state.negaraValue,
                        kodePosDomValue: this.state.kodePosValue, openFormAlamatDomisili: false
                    })
                }

                break;
            case '2':
                if (this.state.alamatValue.length == 0) {
                    this.setState({ indexAlamatDom: '0' })
                    Alert.alert('Perhatian', 'Alamat sesuai KTP tidak boleh kosong',
                        [{
                            text: 'OK',
                            onPress: () => {
                                const textInput = this.field1.current;
                                textInput.focus()
                            }
                        }],
                        { cancelable: false },
                    );
                } else if (this.state.kotaValue.length == 0 || this.state.kotaValue == "Pilih Kota" || this.state.kotaIdValue == "") {
                    this.setState({ indexAlamatDom: '0' })
                    Alert.alert('Perhatian', 'Pilihan kota tidak tersedia',
                        [{
                            text: 'OK',
                            onPress: () => {
                                const textInput = this.field2.current;
                                textInput.focus()
                            }
                        }],
                        { cancelable: false },
                    );
                } else if (this.state.kodePosValue.length == 0) {
                    this.setState({ indexAlamatDom: '0' })
                    Alert.alert('Perhatian', 'Kode pos sesuai KTP tidak boleh kosong',
                        [{
                            text: 'OK',
                            onPress: () => {
                                const textInput = this.field3.current;
                                textInput.focus()
                            }
                        }],
                        { cancelable: false },
                    );
                } else {
                    this.setState({ indexAlamatDom: isOpen })
                    this.setState({
                        alamatDomValue: '',
                        kotaDomValue: '',
                        kotaDomIdValue: '',
                        provinsiDomValue: '',
                        negaraDomValue: '',
                        kodePosDomValue: '', openFormAlamatDomisili: true
                    });
                }
                break;
        }

    }
    onSetPilAlamatSurat(isOpen) {
        switch (isOpen) {
            case '1':
                if (this.state.alamatValue.length == 0) {
                    this.setState({ indexAlamatSurat: '0' })
                    Alert.alert('Perhatian', 'Alamat sesuai KTP tidak boleh kosong',
                        [{
                            text: 'OK',
                            onPress: () => {
                                const textInput = this.field1.current;
                                textInput.focus()
                            }
                        }],
                        { cancelable: false },
                    );
                } else if (this.state.kotaValue.length == 0 || this.state.kotaValue == "Pilih Kota" || this.state.kotaIdValue == "") {
                    this.setState({ indexAlamatSurat: '0' })
                    Alert.alert('Perhatian', 'Pilihan kota tidak tersedia',
                        [{
                            text: 'OK',
                            onPress: () => {
                                const textInput = this.field2.current;
                                textInput.focus()
                            }
                        }],
                        { cancelable: false },
                    );
                } else if (this.state.kodePosValue.length == 0) {
                    this.setState({ indexAlamatSurat: '0' })
                    Alert.alert('Perhatian', 'Kode pos sesuai KTP tidak boleh kosong',
                        [{
                            text: 'OK',
                            onPress: () => {
                                const textInput = this.field3.current;
                                textInput.focus()
                            }
                        }],
                        { cancelable: false },
                    );
                } else {
                    this.setState({ indexAlamatSurat: isOpen })
                    this.setState({ alamatSuratValue: this.state.alamatValue, openFormAlamatSurat: false })
                }
                break;
            case '2':
                if (this.state.alamatDomValue.length == 0) {
                    this.setState({ indexAlamatSurat: '0' })
                    Alert.alert('Perhatian', 'Alamat domisili tidak boleh kosong',
                        [{
                            text: 'OK',
                            onPress: () => {
                                const textInput = this.field1.current;
                                textInput.focus()
                            }
                        }],
                        { cancelable: false },
                    );
                } else if (this.state.kotaDomValue.length == 0 || this.state.kotaDomValue == "Pilih Kota" || this.state.kotaDomIdValue == "") {
                    this.setState({ indexAlamatSurat: '0' })
                    Alert.alert('Perhatian', 'Pilihan kota domisili tidak tersedia',
                        [{
                            text: 'OK',
                            onPress: () => {
                                const textInput = this.field2.current;
                                textInput.focus()
                            }
                        }],
                        { cancelable: false },
                    );
                } else if (this.state.kodePosDomValue.length == 0) {
                    this.setState({ indexAlamatSurat: '0' })
                    Alert.alert('Perhatian', 'Kode pos domisili tidak boleh kosong',
                        [{
                            text: 'OK',
                            onPress: () => {
                                const textInput = this.field3.current;
                                textInput.focus()
                            }
                        }],
                        { cancelable: false },
                    );
                } else {
                    this.setState({ indexAlamatSurat: isOpen })
                    this.setState({ alamatSuratValue: this.state.alamatDomValue, openFormAlamatSurat: false })
                }
                break;
            case '3':
                this.setState({ indexAlamatSurat: isOpen })
                this.setState({ alamatSuratValue: '', openFormAlamatSurat: true })
                break
        }
    }

    _getTujInvest(token) {
        this.setState({ isLoading: true })
        fetch(GLOBAL.getTujuanInvestasi(), {
            method: 'GET',
            headers: {
                'Accept': 'appication/json',
                'Content-type': 'application/json',
                'Authorization': token,
            }
        })
            .then((response) => {
                this.setState({ isLoading: false })
                if (response.status == '201') {
                    let res;
                    return response.json().then(obj => {
                        res = obj;
                        var count = Object.keys(res.data.tujuan_investasi).length;
                        let data_tujInvest = [];
                        for (var i = 0; i < count; i++) {
                            data_tujInvest.push({
                                id: res.data.tujuan_investasi[i].id,
                                value: res.data.tujuan_investasi[i].nama_tujuan_investasi
                            })
                        }
                        this.setState({ dataTujInvest: data_tujInvest })
                    })
                } else if (response.status == '401') {
                    this.Unauthorized()
                } else {
                    GLOBAL.gagalKoneksi()
                }
            })
    }

    _getSumberdana(token) {
        this.setState({ isLoading: true })
        fetch(GLOBAL.getSumberDana(), {
            method: 'GET',
            headers: {
                'Accept': 'appication/json',
                'Content-type': 'application/json',
                'Authorization': token,
            }
        })
            .then((response) => {
                this.setState({ isLoading: false })
                if (response.status == '201') {
                    let res;
                    return response.json().then(obj => {
                        res = obj;
                        var count = Object.keys(res.data.sumberdana).length;
                        let data_sumberdana = [];
                        for (var i = 0; i < count; i++) {
                            data_sumberdana.push({
                                id: res.data.sumberdana[i].id,
                                value: res.data.sumberdana[i].nama_sumberdana
                            })
                        }
                        this.setState({ dataSumberdana: data_sumberdana })
                    })
                } else if (response.status == '401') {
                    this.Unauthorized()
                } else {
                    GLOBAL.gagalKoneksi()
                }
            })
    }

    _getPenghasilan(token) {
        this.setState({ isLoading: true })
        fetch(GLOBAL.getPenghasilan(), {
            method: 'GET',
            headers: {
                'Accept': 'appication/json',
                'Content-type': 'application/json',
                'Authorization': token,
            }
        })
            .then((response) => {
                this.setState({ isLoading: false })
                if (response.status == '201') {
                    let res;
                    return response.json().then(obj => {
                        res = obj;
                        var count = Object.keys(res.data.penghasilan).length;
                        let data_penghasilan = [];
                        for (var i = 0; i < count; i++) {
                            data_penghasilan.push({
                                id: res.data.penghasilan[i].id,
                                value: res.data.penghasilan[i].nama_penghasilan
                            })
                        }
                        this.setState({ dataPenghasilan: data_penghasilan })
                    })
                } else if (response.status == '401') {
                    this.Unauthorized()
                } else {
                    GLOBAL.gagalKoneksi()
                }
            })
    }

    _getPekerjaan(token) {
        this.setState({ isLoading: true })
        fetch(GLOBAL.getPekerjaan(), {
            method: 'GET',
            headers: {
                'Accept': 'appication/json',
                'Content-type': 'application/json',
                'Authorization': token,
            }
        })
            .then((response) => {
                this.setState({ isLoading: false })
                if (response.status == '201') {
                    let res;
                    return response.json().then(obj => {
                        res = obj;
                        var count = Object.keys(res.data.pekerjaan).length;
                        let data_pekerjaan = [];
                        for (var i = 0; i < count; i++) {
                            data_pekerjaan.push({
                                id: res.data.pekerjaan[i].id,
                                value: res.data.pekerjaan[i].nama_pekerjaan
                            })
                        }
                        this.setState({ dataPekerjaan: data_pekerjaan })
                    })
                } else if (response.status == '401') {
                    this.Unauthorized()
                } else {
                    GLOBAL.gagalKoneksi()
                }
            })
    }
    _getPendidikan(token) {
        this.setState({ isLoading: true })
        fetch(GLOBAL.getPendidikan(), {
            method: 'GET',
            headers: {
                'Accept': 'appication/json',
                'Content-type': 'application/json',
                'Authorization': token,
            }
        })
            .then((response) => {
                this.setState({ isLoading: false })
                if (response.status == '201') {
                    let res;
                    return response.json().then(obj => {
                        res = obj;
                        var count = Object.keys(res.data.pendidikan).length;
                        let data_pendidikan = [];
                        for (var i = 0; i < count; i++) {
                            data_pendidikan.push({
                                id: res.data.pendidikan[i].id,
                                value: res.data.pendidikan[i].nama_pendidikan
                            })
                        }
                        this.setState({ dataPendidikan: data_pendidikan })
                    })
                } else if (response.status == '401') {
                    this.Unauthorized()
                } else {
                    GLOBAL.gagalKoneksi()
                }
            })
    }

    _getKota(token, paramKota) {
        this.setState({ isLoading: true })
        var myKota;
        if (paramKota != null) {
            myKota = paramKota
        } else {
            myKota = ''
        }
        fetch(GLOBAL.getKota(myKota), {
            method: 'GET',
            headers: {
                'Accept': 'appication/json',
                'Content-type': 'application/json',
                'Authorization': token,
            }
        })
            .then((response) => {
                this.setState({ isLoading: false })
                if (response.status == '201') {
                    let res;
                    return response.json().then(obj => {
                        res = obj;
                        var count = Object.keys(res.data.kota).length;
                        let data_kota = [];
                        for (var i = 0; i < count; i++) {
                            data_kota.push({
                                id: res.data.kota[i].id,
                                provinsi: res.data.kota[i].propinsi,
                                negara: res.data.kota[i].negara,
                                name: res.data.kota[i].kotamadya
                            })
                        }
                        this.setState({ dataKota: data_kota })
                    })
                } else if (response.status == '401') {
                    this.Unauthorized()
                } else {
                    GLOBAL.gagalKoneksi()
                }
            })
    }

    searchFilterFunction(text, modulName, inputId) {
        if (this.state.dataKota.length > 0) {
            const newData = this.state.dataKota.filter(item => {
                const itemData = item.kota.toUpperCase();
                const textData = text.toUpperCase();

                return itemData.indexOf(textData) > -1;
            });
            this.setState({ dataKotaOption: newData });
            if (newData.length > 0) {
                this.menu.menuCtx.menuActions.openMenu(modulName);
            } else {
                this.menu.menuCtx.menuActions.isMenuOpen(modulName) && this.menu.menuCtx.menuActions.closeMenu(modulName);
            }

        }
        switch (inputId) {
            case 'kota_ktp':
                this.setState({
                    kotaValue: text,
                });
                break
            case 'kota_domisili':
                this.setState({
                    kotaDomValue: text,
                });
                break
        }
    }

    _getToken = async () => {
        var aksesToken = await AsyncStorage.getItem('aksesToken');
        var kotaIdStore = await AsyncStorage.getItem('kotaIdValue');
        var kotaStore = await AsyncStorage.getItem('kotaValue');
        var alamatStore = await AsyncStorage.getItem('alamatValue');
        var provinsiStore = await AsyncStorage.getItem('provinsiValue');
        var negaraStore = await AsyncStorage.getItem('negaraValue');
        var kodePosStore = await AsyncStorage.getItem('kodePosValue');
        var indexAlamatDomStore = await AsyncStorage.getItem('indexAlamatDom');
        var alamatDomStore = await AsyncStorage.getItem('alamatDomValue');
        var kotaDomIdStore = await AsyncStorage.getItem('kotaDomIdValue');
        var kotaDomStore = await AsyncStorage.getItem('kotaDomValue');
        var provinsiDomStore = await AsyncStorage.getItem('provinsiDomValue');
        var negaraDomStore = await AsyncStorage.getItem('negaraDomValue');
        var kodePosDomStore = await AsyncStorage.getItem('kodePosDomValue');
        var indexAlamatSuratStore = await AsyncStorage.getItem('indexAlamatSurat');
        var alamatSuratStore = await AsyncStorage.getItem('alamatSuratValue');
        var pendidikanStore = await AsyncStorage.getItem('pendidikanValue');
        var pendidikanIdStore = await AsyncStorage.getItem('pendidikanId');
        var pendidikanTextStore = await AsyncStorage.getItem('pendidikanText');
        var pekerjaanStore = await AsyncStorage.getItem('pekerjaanValue');
        var pekerjaanIdStore = await AsyncStorage.getItem('pekerjaanId');
        var pekerjaanTextStore = await AsyncStorage.getItem('pekerjaanText');
        var penghasilanStore = await AsyncStorage.getItem('penghasilanValue');
        var penghasilanIdStore = await AsyncStorage.getItem('penghasilanId');
        var sumberdanaStore = await AsyncStorage.getItem('sumberdanaValue');
        var sumberdanaIdStore = await AsyncStorage.getItem('sumberdanaId');
        var sumberdanaTextStore = await AsyncStorage.getItem('sumberdanaText');
        var tujInvestStore = await AsyncStorage.getItem('tujInvestValue');
        var tujInvestIdStore = await AsyncStorage.getItem('tujInvestId');
        var tujInvestTextStore = await AsyncStorage.getItem('tujInvestText');
        if (aksesToken != null) {
            this.setState({ myToken: aksesToken })
            if (kotaStore != null) {
                this.setState({ kotaValue: kotaStore })
            }
            if (kotaIdStore != null) {
                this.setState({ kotaIdValue: kotaIdStore })
            }
            if (alamatStore != null) {
                this.setState({ alamatValue: alamatStore })
            }
            if (provinsiStore != null) {
                this.setState({ provinsiValue: provinsiStore })
            }
            if (negaraStore != null) {
                this.setState({ negaraValue: negaraStore })
            }
            if (kodePosStore != null) {
                this.setState({ kodePosValue: kodePosStore })
            }
            if (indexAlamatDomStore != null) {
                this.setState({ indexAlamatDom: indexAlamatDomStore })
                if(indexAlamatDomStore == 2){
                    this.setState({openFormAlamatDomisili:true})
                }
            }
            if (alamatDomStore != null) {
                this.setState({ alamatDomValue: alamatDomStore })
            }
            if (kotaDomIdStore != null) {
                this.setState({ kotaDomIdValue: kotaDomIdStore })
            }
            if (kotaDomStore != null) {
                this.setState({ kotaDomValue: kotaDomStore })
            }
            if (provinsiDomStore != null) {
                this.setState({ provinsiDomValue: provinsiDomStore })
            }
            if (negaraDomStore != null) {
                this.setState({ negaraDomValue: negaraDomStore })
            }
            if (kodePosDomStore != null) {
                this.setState({ kodePosDomValue: kodePosDomStore })
            }
            if (indexAlamatSuratStore != null) {
                this.setState({ indexAlamatSurat: indexAlamatSuratStore })
            }
            if (alamatSuratStore != null) {
                this.setState({ alamatSuratValue: alamatSuratStore })
                if (alamatSuratStore != alamatStore && alamatSuratStore != alamatDomStore && alamatSuratStore != '') {
                    this.setState({ openFormAlamatSurat: true })
                }
            }
            if (pendidikanStore != null) {
                this.setState({ pendidikanValue: pendidikanStore });
                if (pendidikanStore == "Lainnya") {
                    this.setState({
                        pendidikanInput: true,
                        pendidikanText: pendidikanTextStore
                    });
                }
            }
            if (pendidikanIdStore != null) {
                this.setState({ pendidikanId: pendidikanIdStore })
            }
            if (pekerjaanStore != null) {
                this.setState({ pekerjaanValue: pekerjaanStore })
                if (pekerjaanStore == "Lainnya") {
                    this.setState({
                        pekerjaanInput: true,
                        pekerjaanText: pekerjaanTextStore
                    });
                }
            }
            if (pekerjaanIdStore != null) {
                this.setState({ pekerjaanId: pekerjaanIdStore })
            }
            if (penghasilanStore != null) {
                this.setState({ penghasilanValue: penghasilanStore })
            }
            if (penghasilanIdStore != null) {
                this.setState({ penghasilanId: penghasilanIdStore })
            }
            if (sumberdanaStore != null) {
                this.setState({ sumberdanaValue: sumberdanaStore })
                if (sumberdanaStore == "Lainnya") {
                    this.setState({
                        sumberdanaInput: true,
                        sumberdanaText: sumberdanaTextStore
                    });
                }
            }
            if (sumberdanaIdStore != null) {
                this.setState({ sumberdanaId: sumberdanaIdStore })
            }
            if (tujInvestStore != null) {
                this.setState({ tujInvestValue: sumberdanaStore });
                if (tujInvestStore == "Lainnya") {
                    this.setState({
                        tujInvestInput: true,
                        tujInvestText: tujInvestTextStore
                    });
                }
            }
            if (tujInvestIdStore != null) {
                this.setState({ tujInvestId: tujInvestIdStore })
            }
            this._getKota(this.state.myToken, null);
            this._getPendidikan(this.state.myToken);
            this._getPekerjaan(this.state.myToken);
            this._getPenghasilan(this.state.myToken);
            this._getSumberdana(this.state.myToken);
            this._getTujInvest(this.state.myToken);
        } else {
            this.Unauthorized()
        }
    }
    _onRefresh() {
        this.setState({ refreshing: true });
        this._getToken().then(() => {
            this.setState({ refreshing: false })
        });
    }
    onContentSizeChange = (contentWidth, contentHeight) => {
        this.setState({ screenHeight: contentHeight })
    }
    componentDidMount() {
        this.backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
            this.props.navigation.goBack();
            return true;
        });
        return this._getToken();
    }
    componentWillUnmount() {
        this.backHandler.remove();
    }
    render() {
        return (
            <LinearGradient colors={GLOBAL.BackgroundApp} style={styles.wrapper} >
                <StatusBar backgroundColor={GLOBAL.StatusBarColor} barStyle='light-content' hidden={false} />
                <View style={{ height: GLOBAL.DEVICE_HEIGHT - 100 }}>
                    {/* <MenuProvider ref={(ref) => this.menu = ref} style={styles.inputGroup} customStyles={{ backdrop: {} }}> */}
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                            keyboardShouldPersistTaps = 'always'
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.refreshing}
                                    onRefresh={this._onRefresh.bind(this)}
                                />
                            }>
                            <View style={[styles.containerMain, { marginBottom: 25 }]}>
                                {
                                    this.state.isLoading && <Modal transparent={true}><View style={styles.loadingStyle}><ActivityIndicator size="large" color="#C1FF33" /></View></Modal>
                                }

                                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                    <View style={styles.activeCirclePage}><Text style={styles.btnTxtDefault}>1</Text></View>
                                    <View style={styles.lineCirclePageActive} />
                                    <View style={styles.activeCirclePage}><Text style={styles.btnTxtDefault}>2</Text></View>
                                    <View style={styles.lineCirclePageActive} />
                                    <View style={styles.activeCirclePage} ><Text style={styles.btnTxtDefault}>3</Text></View>
                                    <View style={styles.lineCirclePage} />
                                    <View style={styles.whiteCirclePage} ><Text style={styles.btnTxtDefault}>4</Text></View>
                                </View>

                                <View style={styles.inputGroup} >
                                    <Text style={styles.labelText}>Alamat Sesuai KTP</Text>
                                    <View style={{ borderRadius: 10, borderColor: "#FFF", borderWidth: 1, padding: 10 }}>
                                        <Text style={styles.labelText}>Alamat</Text>
                                        <View style={styles.textInputGroup}>
                                            <TextInput placeholderTextColor="#000" ref={this.field1} /* onSubmitEditing={() => {
                                                const textInput = this.field2.current;
                                                textInput.focus()
                                            }} */ style={styles.textInput} placeholder="Alamat" value={this.state.alamatValue} keyboardType='default' onChangeText={(alamatValue) => this.setState({ alamatValue })} />
                                        </View>
                                        <Text style={styles.labelText}>Kota</Text>
                                        <SearchableDropDown
                                            onTextChange={text => console.log(text)}
                                            onItemSelect={(item) => this.setState({
                                                kotaValue: item.name,
                                                provinsiValue: item.provinsi,
                                                negaraValue: item.negara,
                                                kotaIdValue: item.id
                                            })}
                                            // containerStyle={}
                                            textInputStyle={styles.textInputSearchDropdown}
                                            itemStyle={styles.itemSearchDropdown}
                                            itemTextStyle={{
                                                color: '#222'
                                            }}
                                            itemsContainerStyle={{
                                                maxHeight: 220
                                            }}
                                            items={this.state.dataKota}
                                            placeholder={this.state.kotaValue ==''?'Pilih Kota':this.state.kotaValue}
                                            placeholderTextColor="#000"
                                            resetValue={false}
                                            underlineColorAndroid='transparent' />
                                        {/* <View style={styles.textInputGroup}>
                                            <TextInput
                                                placeholderTextColor="#000000"
                                                placeholder="Pilih Kota"
                                                style={styles.textInput}
                                                value={this.state.kotaValue}
                                                keyboardType="default"
                                                ref={this.field2}
                                                onChangeText={(kotaValue) => this.searchFilterFunction(kotaValue, 'typeSearch', 'kota_ktp')}
                                            />
                                        </View> */}

                                        {/* <Menu name='typeSearch' renderer={Popover} rendererProps={{ preferredPlacement: 'bottom' }}>
                                            <MenuTrigger >
                                            </MenuTrigger>

                                            <MenuOptions >
                                                <ScrollView style={styles.scrollSearchDropdown} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                                                    {this.state.dataKotaOption.length > 0 && this.state.dataKotaOption.map((dataKotaOption, index) =>

                                                        <MenuOption key={index} text={dataKotaOption.kota} style={styles.menuFirstOption}
                                                            onSelect={() => {
                                                                this.setState({
                                                                    kotaValue: dataKotaOption.kota,
                                                                    provinsiValue: dataKotaOption.provinsi,
                                                                    negaraValue: dataKotaOption.negara,
                                                                    kotaIdValue: dataKotaOption.id
                                                                });
                                                                const textInput = this.field3.current;
                                                                textInput.focus();
                                                            }
                                                            } />

                                                    )}
                                                </ScrollView>
                                            </MenuOptions>
                                        </Menu> */}
                                        <Text style={styles.labelText}>Provinsi</Text>
                                        <View style={styles.textInputGroup}>
                                            <TextInput placeholderTextColor="#000" style={styles.textInput} placeholder="Provinsi" value={this.state.provinsiValue} editable={false} onChangeText={(provinsiValue) => this.setState({ provinsiValue })} />
                                        </View>
                                        <Text style={styles.labelText}>Negara</Text>
                                        <View style={styles.textInputGroup}>
                                            <TextInput placeholderTextColor="#000" style={styles.textInput} placeholder="Negara" value={this.state.negaraValue} editable={false} onChangeText={(negaraValue) => this.setState({ negaraValue })} />
                                        </View>
                                        <Text style={styles.labelText}>Kode Pos</Text>
                                        <View style={styles.textInputGroup}>
                                            <TextInput placeholderTextColor="#000" ref={this.field3} style={styles.textInput} returnKeyType='done' placeholder="Kode Pos" value={this.state.kodePosValue} keyboardType='number-pad' onChangeText={(kodePosValue) => this.setState({ kodePosValue })} />
                                        </View>

                                    </View>
                                </View>

                                <View style={styles.inputGroup}>
                                    <Text style={styles.labelText}>Alamat Sesuai Domisili</Text>
                                    <View style={{ flexDirection: 'row' }}>
                                        {option1.map(item => (
                                            <View key={item.value} style={styles.radioBtnContainer} >
                                                <TouchableOpacity onPress={() => {
                                                    this.onSetPilAlamatDomisili(item.value)
                                                }} style={styles.radioBtnCircle} >
                                                    {renderIf(this.state.indexAlamatDom == item.value)(
                                                        <View style={styles.radioBtnChecked} />
                                                    )}
                                                </TouchableOpacity>
                                                <Text style={styles.txtLittle}>{item.label}</Text>
                                            </View>
                                        ))}
                                    </View>

                                    {renderIf(this.state.openFormAlamatDomisili)(

                                        <View style={{ borderRadius: 10, borderColor: "#FFF", borderWidth: 1, padding: 10 }}>

                                            <Text style={styles.labelText}>Alamat</Text>
                                            <View style={styles.textInputGroup}>
                                                <TextInput placeholderTextColor="#000" ref={this.field4} onSubmitEditing={() => {
                                                    const textInput = this.field5.current;
                                                    textInput.focus()
                                                }} style={styles.textInput} placeholder="Alamat" value={this.state.alamatDomValue} keyboardType='default' onChangeText={(alamatDomValue) => this.setState({ alamatDomValue })} />
                                            </View>

                                            <Text style={styles.labelText}>Kota Domisili</Text>
                                            <SearchableDropDown2
                                                onTextChange={text => console.log(text)}
                                                onItemSelect={(item) => this.setState({
                                                    kotaDomValue: item.name,
                                                    provinsiDomValue: item.provinsi,
                                                    negaraDomValue: item.negara,
                                                    kotaDomIdValue: item.id
                                                })}
                                                // containerStyle={}
                                                textInputStyle={styles.textInputSearchDropdown}
                                                itemStyle={styles.itemSearchDropdown}
                                                itemTextStyle={{
                                                    color: '#222'
                                                }}
                                                itemsContainerStyle={{
                                                    maxHeight: 220
                                                }}
                                                items={this.state.dataKota}
                                                placeholder={this.state.kotaDomValue ==''?'Pilih Kota Domisili':this.state.kotaDomValue}
                                                placeholderTextColor="#000"
                                                resetValue={false}
                                                underlineColorAndroid='transparent' />
                                            {/* <View style={styles.textInputGroup}>
                                                <TextInput
                                                    placeholderTextColor="#000000"
                                                    placeholder="Pilih Kota"
                                                    style={styles.textInput}
                                                    value={this.state.kotaDomValue}
                                                    keyboardType="default"
                                                    ref={this.field5}
                                                    onChangeText={(kotaDomValue) => this.searchFilterFunction(kotaDomValue, 'kotaDomisili', 'kota_domisili')}
                                                />
                                            </View> */}

                                            {/* <Menu name='kotaDomisili' renderer={Popover} rendererProps={{ preferredPlacement: 'center' }}>
                                                <MenuTrigger >
                                                </MenuTrigger>

                                                <MenuOptions>
                                                    <ScrollView style={styles.scrollSearchDropdown} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                                                        {this.state.dataKotaOption.length > 0 && this.state.dataKotaOption.map((dataKotaOption, index) =>

                                                            <MenuOption key={index} text={dataKotaOption.kota} style={styles.menuFirstOption}
                                                                onSelect={() => {
                                                                    this.setState({
                                                                        kotaDomValue: dataKotaOption.kota,
                                                                        provinsiDomValue: dataKotaOption.provinsi,
                                                                        negaraDomValue: dataKotaOption.negara,
                                                                        kotaDomIdValue: dataKotaOption.id
                                                                    });
                                                                    const textInput = this.field6.current;
                                                                    textInput.focus();
                                                                }
                                                                } />

                                                        )}
                                                    </ScrollView>
                                                </MenuOptions>
                                            </Menu> */}
                                            <Text style={styles.labelText}>Provinsi</Text>
                                            <View style={styles.textInputGroup}>
                                                <TextInput placeholderTextColor="#000" style={styles.textInput} placeholder="Provinsi" value={this.state.provinsiDomValue} editable={false} onChangeText={(provinsiDomValue) => this.setState({ provinsiDomValue })} />
                                            </View>
                                            <Text style={styles.labelText}>Negara</Text>
                                            <View style={styles.textInputGroup}>
                                                <TextInput placeholderTextColor="#000" style={styles.textInput} placeholder="Negara" value={this.state.negaraDomValue} editable={false} onChangeText={(negaraDomValue) => this.setState({ negaraDomValue })} />
                                            </View>

                                            <Text style={styles.labelText}>Kode Pos</Text>
                                            <View style={styles.textInputGroup}>
                                                <TextInput placeholderTextColor="#000" ref={this.field6} style={styles.textInput} placeholder="Kode Pos" value={this.state.kodePosDomValue} keyboardType='number-pad' onChangeText={(kodePosDomValue) => this.setState({ kodePosDomValue })} />
                                            </View>
                                        </View>
                                    )}
                                </View>
                                <View style={styles.inputGroup} >
                                    <Text style={styles.labelText}>Alamat Surat Menyurat</Text>
                                    {option2.map(item => (
                                        <View key={item.value} style={styles.radioBtnContainer} >
                                            <TouchableOpacity onPress={() => {
                                                this.onSetPilAlamatSurat(item.value)
                                            }} style={styles.radioBtnCircle} >
                                                {renderIf(this.state.indexAlamatSurat == item.value)(
                                                    <View style={styles.radioBtnChecked} />
                                                )}
                                            </TouchableOpacity>
                                            <Text style={styles.txtLittle}>{item.label}</Text>
                                        </View>
                                    ))}

                                </View>
                                {renderIf(this.state.openFormAlamatSurat)(
                                    <View style={styles.inputGroup} >
                                        <View style={styles.textInputGroup}>
                                            <TextInput placeholderTextColor="#000" ref={this.field7} maxLength={150} style={styles.textInput} placeholder="Alamat Surat Menyurat" keyboardType='default' value={this.state.alamatSuratValue} onChangeText={(alamatSuratValue) => this.setState({ alamatSuratValue })} />
                                        </View>
                                    </View>
                                )}
                                <Dropdown
                                    label='Pendidikan'
                                    textColor='#FFF'
                                    itemColor='#000'
                                    baseColor='#FFF'
                                    selectedItemColor='#000'
                                    value={this.state.pendidikanValue}
                                    onChangeText={(pendidikanValue) => { this.onPendSelected(pendidikanValue) }}
                                    data={this.state.dataPendidikan} />
                                {renderIf(this.state.pendidikanInput)(
                                    <View style={styles.textInputGroup}>
                                        <TextInput maxLength={50} placeholderTextColor="#000" style={styles.textInput} placeholder="Pendidikan" keyboardType='default' value={this.state.pendidikanText} onChangeText={(pendidikanText) => this.setState({ pendidikanText })} />
                                    </View>
                                )}
                                <Dropdown
                                    label='Pekerjaan'
                                    textColor='#FFF'
                                    itemColor='#000'
                                    baseColor='#FFF'
                                    selectedItemColor='#000'
                                    value={this.state.pekerjaanValue}
                                    onChangeText={(pekerjaanValue) => { this.onPekSelected(pekerjaanValue) }}
                                    data={this.state.dataPekerjaan} />
                                {renderIf(this.state.pekerjaanInput)(
                                    <View style={styles.textInputGroup}>
                                        <TextInput maxLength={50} placeholderTextColor="#000" style={styles.textInput} placeholder="Pekerjaan" keyboardType='default' value={this.state.pekerjaanText} onChangeText={(pekerjaanText) => this.setState({ pekerjaanText })} />
                                    </View>
                                )}
                                <Dropdown
                                    label='Sumber Dana'
                                    textColor='#FFF'
                                    itemColor='#000'
                                    baseColor='#FFF'
                                    selectedItemColor='#000'
                                    value={this.state.sumberdanaValue}
                                    onChangeText={(sumberdanaValue) => { this.onSumberSelected(sumberdanaValue) }}
                                    data={this.state.dataSumberdana} />
                                {renderIf(this.state.sumberdanaInput)(
                                    <View style={styles.textInputGroup}>
                                        <TextInput maxLength={50} onFocus={() => this.setState({ addHeight: true })} onBlur={() => this.setState({ addHeight: false })} placeholderTextColor="#000" style={styles.textInput} placeholder="Sumber Dana" keyboardType='default' value={this.state.sumberdanaText} onChangeText={(sumberdanaText) => this.setState({ sumberdanaText })} />
                                    </View>
                                )}
                                <Dropdown
                                    label='Penghasilan Per Tahun'
                                    textColor='#FFF'
                                    itemColor='#000'
                                    baseColor='#FFF'
                                    selectedItemColor='#000'
                                    value={this.state.penghasilanValue}
                                    onChangeText={(penghasilanValue) => { this.onPengSelected(penghasilanValue) }}
                                    data={this.state.dataPenghasilan} />
                                <Dropdown
                                    label='Tujuan Investasi'
                                    textColor='#FFF'
                                    itemColor='#000'
                                    baseColor='#FFF'
                                    selectedItemColor='#000'
                                    value={this.state.tujInvestValue}
                                    onChangeText={(tujInvestValue) => { this.onTujSelected(tujInvestValue) }}
                                    data={this.state.dataTujInvest} />
                                {renderIf(this.state.tujInvestInput)(
                                    <View style={styles.textInputGroup}>
                                        <TextInput maxLength={50} onFocus={() => this.setState({ addHeight: true })} onBlur={() => this.setState({ addHeight: false })} placeholderTextColor="#000" style={styles.textInput} placeholder="Tujuan Investasi" keyboardType='default' value={this.state.tujInvestText} onChangeText={(tujInvestText) => this.setState({ tujInvestText })} />
                                    </View>
                                )}
                                {renderIf(this.state.addHeight == true)(
                                    <View style={{ width: '100%', height: 200 }} />
                                )}
                            </View>
                        </ScrollView>
                    {/* </MenuProvider> */}
                    {renderIf(this.state.viewBlink)(
                        <BlinkingIcon name="ios-arrow-down" />
                    )}
                </View>
                <View style={styles.boxBtnBottom}>
                    <View style={{ flexDirection: "row", flex: 1, paddingLeft: 15, paddingRight: 15 }}>

                        <AwesomeButton
                            borderRadius={15}
                            backgroundColor='#28ccfb'
                            backgroundShadow="#000"
                            backgroundDarker="#23b6e0"
                            height={40}
                            width={GLOBAL.DEVICE_WIDTH * 0.5 - 25}
                            style={{ marginTop: 10, alignSelf: 'flex-end', marginRight: 10 }}
                            onPress={this.onPreviuos}>
                            <Image source={require('./../img/btnPrev.png')} style={{ width: GLOBAL.DEVICE_WIDTH * 0.5 - 25, height: 40, resizeMode: 'stretch' }} />
                            <Text style={[{ position: 'absolute' }, styles.btnTextWhite]}>SEBELUMNYA</Text>
                        </AwesomeButton>

                        <AwesomeButton
                            borderRadius={15}
                            backgroundColor='#4F7942'
                            backgroundShadow="#000"
                            backgroundDarker="#45673a"
                            height={40}
                            width={GLOBAL.DEVICE_WIDTH * 0.5 - 25}
                            style={{ marginTop: 10, alignSelf: 'flex-end', marginLeft: 10 }}
                            onPress={this.onNext}>
                            <Image source={require('./../img/btnLogin.png')} style={{ width: GLOBAL.DEVICE_WIDTH * 0.5 - 25, height: 40, resizeMode: 'stretch' }} />
                            <Text style={[{ position: 'absolute' }, styles.btnTextWhite]}>BERIKUTNYA</Text>
                        </AwesomeButton>
                    </View>
                </View>
                {renderIf(this.state.modalVisibleUnAuth == true)(
                    <UnAuth visibleModal={this.state.modalVisibleUnAuth} />
                )}
            </LinearGradient >
        );
    }
}

export default RegistPage3;
