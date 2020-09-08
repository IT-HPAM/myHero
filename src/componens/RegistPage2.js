
import React, { Component } from 'react';
import { Image, TouchableOpacity, Text, StatusBar,Platform, View, KeyboardAvoidingView, TextInput, Alert, Modal, ActivityIndicator, RefreshControl,BackHandler} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Dropdown } from 'react-native-material-dropdown';
import AsyncStorage from '@react-native-community/async-storage';
import AwesomeButton from "react-native-really-awesome-button";
import { ScrollView } from 'react-native-gesture-handler';
// import { useDarkMode } from 'react-native-dark-mode';
import DateTimePicker from "react-native-modal-datetime-picker";
import UnAuth from './UnauthPage';
import renderIf from './Renderif';
import Icon from 'react-native-vector-icons/FontAwesome';
var styles = require('../utils/Styles');
var GLOBAL = require('../utils/Helper');
var platform = Platform.OS;
// const isDarkMode = useDarkMode();
const option = [{ label: 'Pria', value: '1' }, { label: 'Wanita', value: '2' }];

class RegistPage2 extends React.Component {
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
            sDateTimePickerVisible: false,
            eKtp: '',
            myToken: '',
            editNama: true,
            editNoHp: true,
            editJk: true,
            editTglLahir: true,
            editTempatLahir: true,
            namaValue: '',
            emailValue: '',
            noHpValue: '',
            tglLahirValue: '',
            tempatLahirValue: '',
            statusNikahValue: '',
            agamaValue: '',
            dataStatusNikah: [{ id: 1, value: 'Belum Menikah' }, { id: 2, value: 'Menikah' }, { id: 3, value: 'Janda / Duda' }],
            dataAgama: [],
            refreshing: false,
            modalVisibleUnAuth: false,
            jenis_kelaminValue:'0',
            isCheckedPria:false,
            isCheckedWanita:false,
        }
    }
    Unauthorized(){
        this.setState({ isLoading: false,modalVisibleUnAuth:true})
        setTimeout(()=> this.logout(),GLOBAL.timeOut);
    }
    logout = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Main')
    }

    showDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: true });
    };

    hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
    };

    handleDatePicked = date => {
        let dateChoosed = date;
        var a;
        if ((dateChoosed.getMonth() + 1) < 10) {
            a = '0' + (dateChoosed.getMonth() + 1)
        } else {
            a = (dateChoosed.getMonth() + 1)
        }
        let formatted_date = dateChoosed.getDate() + "-" + a + "-" + dateChoosed.getFullYear()
        this.setState({ tglLahirValue: formatted_date })
        this.hideDateTimePicker();
        const textInput = this.field5.current;
        textInput.focus()
    };

    onPreviuos = () => {
        this.props.navigation.navigate('Regist1');
    }
    onNext = () => {
        if (this.state.namaValue.length == 0) {
            Alert.alert('Perhatian', 'Nama tidak boleh kosong',
                [{ text: 'OK',
                onPress: () => { const textInput = this.field1.current;
                    textInput.focus()}
                  }],
                  {cancelable: false},
            );
        } else if (this.state.emailValue.length == 0) {
            Alert.alert('Perhatian', 'Email tidak boleh kosong',
                [{ text: 'OK',
                onPress: () => { const textInput = this.field2.current;
                    textInput.focus()}
                  }],
                  {cancelable: false},
            );
        } else if (!this.state.emailValue.match(GLOBAL.mailFormat)) {
            Alert.alert('Perhatian', 'Email tidak valid',
                [{ text: 'OK',
                onPress: () => { const textInput = this.field2.current;
                    textInput.focus()}
                }],
                {cancelable: false},
            );
        } else if (this.state.noHpValue.length == 0) {
            Alert.alert('Perhatian', 'No ponsel tidak boleh kosong',
                [{ text: 'OK',
                onPress: () => { const textInput = this.field3.current;
                    textInput.focus()}
                  }],
                  {cancelable: false},
            );
        } else if (!this.state.noHpValue.match(GLOBAL.numbersFormat)) {
            Alert.alert('Perhatian', 'No ponsel tidak valid',
                [{ text: 'OK',
                onPress: () => { const textInput = this.field3.current;
                    textInput.focus()}
                  }],
                  {cancelable: false},
            );
        } else if (this.state.jenis_kelaminValue == '0') {
            Alert.alert('Perhatian', 'Jenis kelamin tidak boleh kosong',
                [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
                { cancelable: false },
            );
        } else if (this.state.tglLahirValue.length == 0) {
            Alert.alert('Perhatian', 'Tanggal lahir tidak boleh kosong',
                [{ text: 'OK',
                onPress: () => { const textInput = this.field4.current;
                    textInput.focus();
                    this.showDateTimePicker();
                }
                }],
                {cancelable: false},
            );
        } else if (this.state.tempatLahirValue.length == 0) {
            Alert.alert('Perhatian', 'Tempat lahir tidak boleh kosong',
                [{ text: 'OK',
                onPress: () => { const textInput = this.field5.current;
                    textInput.focus()}
                }],
                {cancelable: false},
            );
        } else if (this.state.statusNikahValue.length == 0) {
            Alert.alert('Perhatian', 'Status nikah tidak boleh kosong',
                [{ text: 'OK',
                onPress: () => { const textInput = this.field6.current;
                    textInput.focus()}
                }],
                {cancelable: false},
            );
        } else if (this.state.agamaValue.length == 0) {
            Alert.alert('Perhatian', 'Agama tidak boleh kosong',
                [{ text: 'OK',onPress: () => console.log('OK Pressed') }],
                { cancelable: false },
            );
        } else {
            var statusNikahId;
            var a = this.state.dataStatusNikah
            var b = a.map((a, key) => a);
            for (var i = 0; i < b.length; i++) {
                if (b[i].value == this.state.statusNikahValue) {
                    statusNikahId = b[i].id
                }
            }
            var agamaId;
            var agama = this.state.dataAgama;
            var agama2 = agama.map((agama, key) => agama);
            for (var i = 0; i < agama2.length; i++) {
                if (agama2[i].value == this.state.agamaValue) {
                    agamaId = agama2[i].id
                }
            }
            AsyncStorage.setItem('jkValue', this.state.jenis_kelaminValue);
            AsyncStorage.setItem('tglLahirValue', this.state.tglLahirValue);
            AsyncStorage.setItem('tempatLahirValue', this.state.tempatLahirValue);
            AsyncStorage.setItem('statusNikahValue', this.state.statusNikahValue);
            AsyncStorage.setItem('statusNikahId', '' + statusNikahId);
            AsyncStorage.setItem('agamaValue', this.state.agamaValue);
            AsyncStorage.setItem('agamaId', '' + agamaId);
            this.props.navigation.navigate('Regist3')
        }
    }
    _getAgama(token) {
        fetch(GLOBAL.getAgama(), {
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
                        var count = Object.keys(res.data.agama).length;
                        let data_agama = [];
                        for (var i = 0; i < count; i++) {
                            data_agama.push({
                                id: res.data.agama[i].id,
                                value: res.data.agama[i].nama_agama
                            })
                        }
                        this.setState({ dataAgama: data_agama })
                    })
                } else if (response.status == '401') {
                    this.Unauthorized()
                } else {
                    GLOBAL.gagalKoneksi()
                }
            })
    }
    // _cekEktp(token, eKtp) {
    //     fetch(GLOBAL.cekNIK(), {
    //         method: 'POST',
    //         headers: {
    //             'Accept': 'appication/json',
    //             'Content-type': 'application/json',
    //             'Authorization': token,
    //         },
    //         body: JSON.stringify({
    //             nik: eKtp
    //         })
    //     })
    //         .then((response) => response.json())
    //         .then((res) => {
    //             this.setState({ isLoading: false })
    //             const ktp = Object.values(res);
    //             if (ktp[0] === 'valid') {
    //                 if (ktp[1].jenis_kelamin == 'Laki-Laki') {
    //                     this.setState({ jenis_kelaminValue: 1 })
    //                 } else {
    //                     this.setState({ jenis_kelaminValue: 2 })
    //                 }
    //                 if (ktp[1].tgl_lahir != null) {
    //                     var tglX = ktp[1].tgl_lahir;
    //                     var tgl = tglX.split('-');
    //                     var tglLahir = tgl[2] + '-' + tgl[1] + '-' + tgl[0];
    //                     this.setState({ tglLahirValue: tglLahir, editTglLahir: false })
    //                 }
    //                 if (ktp[1].status_nikah == 'BELUM KAWIN') {
    //                     this.setState({ statusNikahValue: 'Belum Menikah' })
    //                 } else {
    //                     this.setState({ statusNikahValue: 'Menikah' })
    //                 }
    //                 if (ktp[1].nama != null) {
    //                     this.setState({ namaValue: ktp[1].nama, editNama: false })
    //                 }
    //                 if (ktp[1].tempat_lahir != null) {
    //                     this.setState({ tempatLahirValue: ktp[1].tempat_lahir, editTempatLahir: false })
    //                 }
    //                 if (ktp[1].kota != null) {
    //                     AsyncStorage.setItem('kotaValue', ktp[1].kota);
    //                 }
    //                 if (ktp[1].alamat != null) {
    //                     AsyncStorage.setItem('alamatValue', ktp[1].alamat);
    //                 }

    //             } else {
    //                 // Alert.alert('Perhatian', 'E-KTP tidak valid',
    //                 //     [{ text: 'OK', onPress: () => this.setState({ editNama: true, editJk: true, editTglLahir: true }) }],
    //                 //     { cancelable: false },
    //                 // );
    //                 this.setState({ editNama: true, editJk: true, editTglLahir: true })
    //             }
    //         })
    // }
    _getToken = async () => {
        var aksesToken = await AsyncStorage.getItem('aksesToken');
        var eKtpStore = await AsyncStorage.getItem('eKtp');
        var namaStore = await AsyncStorage.getItem('namaValue');
        var emailStore = await AsyncStorage.getItem('emailValue');
        var noHpStore = await AsyncStorage.getItem('noHpValue');
        var jkStore = await AsyncStorage.getItem('jkValue');
        var tglLahirStore = await AsyncStorage.getItem('tglLahirValue');
        var tempatLahirStore = await AsyncStorage.getItem('tempatLahirValue');
        var statusNikahStore = await AsyncStorage.getItem('statusNikahValue');
        var statusNikahIdStore = await AsyncStorage.getItem('statusNikahId');
        var agamaStore = await AsyncStorage.getItem('agamaValue');
        var agamaIdStore = await AsyncStorage.getItem('agamaId');
        if (aksesToken != null) {
            this.setState({ myToken: aksesToken })
            if (namaStore != null) {
                this.setState({ namaValue: namaStore })
            }
            // if (eKtpStore != null) {
            //     this._cekEktp(this.state.myToken, eKtpStore)
            // }
            if (emailStore != null) {
                this.setState({ emailValue: emailStore })
            }
            if (noHpStore != null) {
                this.setState({ noHpValue: noHpStore })
            }
            
            if (jkStore != null) {
                this.setState({jenis_kelaminValue: jkStore})
            }
            if (tglLahirStore != null) {
                this.setState({ tglLahirValue: tglLahirStore })
            }
            if (tempatLahirStore != null) {
                this.setState({ tempatLahirValue: tempatLahirStore })
            }
            if (statusNikahStore != null) {
                this.setState({ statusNikahValue: statusNikahStore })
            }
            if (statusNikahIdStore != null) {
                this.setState({ statusNikahId: statusNikahIdStore })
            }
            if (agamaStore != null) {
                this.setState({ agamaValue: agamaStore })
            }
            if (agamaIdStore != null) {
                this.setState({ agamaIdValue: agamaIdStore })
            }
            this._getAgama(this.state.myToken);
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
                <View style={{height:GLOBAL.DEVICE_HEIGHT-100}}> 
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh.bind(this)}
                        />
                    } >
                    <KeyboardAvoidingView behavior="position">
                    <View style={[styles.containerMain,{marginBottom:25}]}>

                        {
                            this.state.isLoading && <Modal transparent={true}><View style={styles.loadingStyle}><ActivityIndicator size="large" color="#C1FF33" /></View></Modal>
                        }
                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <View style={styles.activeCirclePage}><Text style={styles.btnTxtDefault}>1</Text></View>
                            <View style={styles.lineCirclePageActive} />
                            <View style={styles.activeCirclePage}><Text style={styles.btnTxtDefault}>2</Text></View>
                            <View style={styles.lineCirclePage} />
                            <View style={styles.whiteCirclePage} ><Text style={styles.btnTxtDefault}>3</Text></View>
                            <View style={styles.lineCirclePage} />
                            <View style={styles.whiteCirclePage} ><Text style={styles.btnTxtDefault}>4</Text></View>
                        </View>
                        <View style={styles.inputGroup} >
                            <Text style={styles.labelText}>Nama</Text>
                            <View style={styles.textInputGroup}>
                                <TextInput placeholderTextColor="#000000" ref={this.field1} onSubmitEditing={() =>{ const textInput = this.field2.current;
                        textInput.focus()} } style={styles.textInput} placeholder="Nama" value={this.state.namaValue} keyboardType='default' editable={this.state.editNama} onChangeText={(namaValue) => this.setState({ namaValue })} />
                            </View>
                        </View>
                        <View style={styles.inputGroup} >
                            <Text style={styles.labelText}>Email</Text>
                            <View style={styles.textInputGroup}>
                                <TextInput placeholderTextColor="#000000" ref={this.field2} onSubmitEditing={() =>{ const textInput = this.field3.current;
                        textInput.focus()} } style={styles.textInput} placeholder="Email" keyboardType='email-address' value={this.state.emailValue} onChangeText={(emailValue) => this.setState({ emailValue })} />
                            </View>
                        </View>
                        <View style={styles.inputGroup} >
                            <Text style={styles.labelText}>No Ponsel</Text>
                            <View style={styles.textInputGroup}>
                                <TextInput placeholderTextColor="#000000" ref={this.field3} onSubmitEditing={() =>{ const textInput = this.field4.current;
                        textInput.focus()} } style={styles.textInput} placeholder="No Ponsel" keyboardType='number-pad' value={this.state.noHpValue} editable={this.state.editNoHp} onChangeText={(noHpValue) => this.setState({ noHpValue })} />
                            </View>
                        </View>
                        {/* <View style={styles.inputGroup} >
                            <Text style={styles.labelText}>Jenis Kelamin</Text>
                            <View style={{flexDirection:'row'}}>
                            {option.map(item =>(
                                    <View key={item.value} style={styles.radioBtnContainer} >
                                        <TouchableOpacity onPress={() => this.setState({jenis_kelaminValue: item.value}) } style={styles.radioBtnCircle} > 
                                            {renderIf(this.state.jenis_kelaminValue == item.value)(
                                                <View style={styles.radioBtnChecked} />
                                            )}
                                        </TouchableOpacity>
                                        <Text style={styles.txtLittle}>{item.label}</Text>
                                    </View>
                            )) }
                            </View>
                        </View> */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.labelText}>Jenis Kelamin</Text>
                            <View style={{flexDirection:'row'}}>
                            {option.map(item =>(
                                    <View key={item.value} style={styles.radioBtnContainer} >
                                        <TouchableOpacity onPress={() =>{this.setState({jenis_kelaminValue: item.value}) } } style={styles.radioBtnCircle} > 
                                            {renderIf(this.state.jenis_kelaminValue == item.value)(
                                                <View style={styles.radioBtnChecked} />
                                            )}
                                        </TouchableOpacity>
                                        <Text style={styles.txtLittle}>{item.label}</Text>
                                    </View>
                            )) }
                            </View>
                        </View>
                        <View style={styles.inputGroup} >
                            <TouchableOpacity onPress={this.showDateTimePicker} ref={this.field4}>
                                <Text style={styles.labelText}>Tanggal Lahir</Text>
                                <View style={styles.textInputGroup} >
                                    <View style={styles.iconGroupLeft} >
                                        <Icon name="calendar" size={20} style={styles.colorIconInput}/>
                                    </View>
                                    <Text style={styles.textInput}>{this.state.tglLahirValue}</Text>
                                    <DateTimePicker
                                        isVisible={this.state.isDateTimePickerVisible}
                                        onConfirm={this.handleDatePicked}
                                        onCancel={this.hideDateTimePicker}
                                        datePickerContainerStyleIOS={{backgroundColor:'#3676c2'}}
                                        cancelButtonContainerStyleIOS={{backgroundColor:'#3676c2'}}
                                        titleStyle={{color:'#FFF'}}
                                        confirmTextStyle={{color:'#FFF'}}
                                        cancelTextStyle={{color:'#FFF'}}
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.inputGroup} >
                            <Text style={styles.labelText}>Tempat Lahir</Text>
                            <View style={styles.textInputGroup}>
                                <TextInput placeholderTextColor="#000000" ref={this.field5} onSubmitEditing={() =>{ const textInput = this.field6.current;
                        textInput.focus()} }  style={styles.textInput} editable={this.state.editTempatLahir} placeholder="Tempat Lahir" value={this.state.tempatLahirValue} keyboardType='default' onChangeText={(tempatLahirValue) => this.setState({ tempatLahirValue })} />
                            </View>
                        </View>
                        <Dropdown
                            label='Status Pernikahan'
                            textColor='#FFF'
                            itemColor='#000'
                            baseColor='#FFF'
                            value={this.state.statusNikahValue}
                            selectedItemColor='#000'
                            onChangeText={(statusNikahValue) =>this.setState({ statusNikahValue }) } 
                            data={this.state.dataStatusNikah}
                            ref={this.field6}  />
                        <Dropdown
                            label='Agama'
                            textColor='#FFF'
                            itemColor='#000'
                            baseColor='#FFF'
                            selectedItemColor='#000'
                            value={this.state.agamaValue}
                            onChangeText={(agamaValue) => { this.setState({ agamaValue }) } } 
                            data={this.state.dataAgama}  />
                        
                    </View>
                    </KeyboardAvoidingView>
                </ScrollView>
                </View>
                <View style={styles.boxBtnBottom}>
                    <View style={{ flexDirection: "row",flex: 1,paddingRight:15,paddingLeft:15 }}>
                        {/* <TouchableOpacity style={styles.btnBottomPrev} onPress={this.onPreviuos}>
                            <Text style={styles.btnTextWhite}>SEBELUMNYA</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnBottomNext} onPress={this.onNext}>
                            <Text style={styles.btnTextWhite}>BERIKUTNYA</Text>
                        </TouchableOpacity> */}
                        <AwesomeButton
                            borderRadius={15}
                            backgroundColor='#28ccfb'
                            backgroundShadow="#000"
                            backgroundDarker="#23b6e0"
                            height={40}
                            width={GLOBAL.DEVICE_WIDTH*0.5-25}
                            style={{marginTop:10,alignSelf:'flex-end', marginRight:10}}
                            onPress={this.onPreviuos}
                        >
                        <Image source={require('./../img/btnPrev.png')} style={{width:GLOBAL.DEVICE_WIDTH*0.5-25,height:40,resizeMode:'stretch'}} />
                        <Text style={[{position: 'absolute'},styles.btnTextWhite]}>SEBELUMNYA</Text>
                        </AwesomeButton>

                        <AwesomeButton
                            borderRadius={15}
                            backgroundColor='#4F7942'
                            backgroundShadow="#000"
                            backgroundDarker="#45673a"
                            height={40}
                            width={GLOBAL.DEVICE_WIDTH*0.5-25}
                            style={{marginTop:10,alignSelf:'flex-end',marginLeft:10}}
                            onPress={this.onNext}
                        >
                        <Image source={require('./../img/btnLogin.png')} style={{width:GLOBAL.DEVICE_WIDTH*0.5-25,height:40,resizeMode:'stretch'}} />
                        <Text style={[{position: 'absolute'},styles.btnTextWhite]}>BERIKUTNYA</Text>
                        </AwesomeButton>
                    </View>
                </View>
                {renderIf(this.state.modalVisibleUnAuth == true)(
              <UnAuth visibleModal={this.state.modalVisibleUnAuth}/>
          )}
            </LinearGradient >
        );
    }
}

export default RegistPage2;
