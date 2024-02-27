import React, { FC, ReactElement, useState, useRef } from 'react';
import {
    Alert,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    StyleSheet,
    Image,
} from 'react-native';
// import Parse from 'parse/react-native';
import { useNavigation } from '@react-navigation/native';
import LinkButton from "../../components/LinkButton";
import Colors from "../../constants/Colors";

export const CreateNewPass = (props) => {
    const navigation = useNavigation();
    // Your state variables
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const numberOfInputs = 4; // Set the number of OTP digits
    const inputRefs = Array.from({ length: numberOfInputs }).map(() => useRef(null));
    const [otp, setOtp] = useState(Array(numberOfInputs).fill(''));

    const handleInputChange = (index, value) => {
        // Update the OTP array with the new value
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Move focus to the next input or the previous one on backspace
        if (value && index < numberOfInputs - 1) {
            inputRefs[index + 1].current.focus();
        } else if (!value && index > 0) {
            inputRefs[index - 1].current.focus();
        }
    };    // const isValidPassword = (password: string): boolean => {
    //     // Check if password meets your requirements
    //     // This is a simple example, you can add more complex checks
    //     return password.length >= 8;
    // };
    const otpValue = otp.join(''); 

    const sendOtp = async () => {
        try {
            // Create a new instance of FormData
            const formData = new FormData();

            // Append key-value pairs for each form field
            // formData.append('email', email);
            formData.append('otp', otpValue)
            formData.append('newpassword', confirmPassword)
            // Make a POST request with fetch()
            console.log(formData,'fooormmdataaa')
            const response = await fetch('https://www.hidetrade.eu/app/APIs/forgot-password/forgot-password.php', {
                method: 'POST',
                body: formData, // Use FormData object as the body
            });

            // Check if the request was successful
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            // Parse the response JSON data
            const res = await response.json();
            const fil = JSON.stringify(res)
            console.log("CreatePass" + JSON.stringify(res));
            if (res.status == true) {
                props.navigation.navigate('Login')
            }
            Alert.alert(res.message)
            // console.log(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    //   const handleSetPassword = async (): Promise<void> => {
    //     if (!isValidPassword(newPassword)) {
    //       Alert.alert('Error!', 'New password must be at least 8 characters long.');
    //       return;
    //     }

    //     if (newPassword !== confirmPassword) {
    //       Alert.alert('Error!', 'New passwords do not match.');
    //       setPasswordsMatch(false);
    //       return;
    //     }

    //     try {
    //       const user = Parse.User.current();
    //       if (!user) {
    //         throw new Error('User not found');
    //       }

    //       await user.setPassword(newPassword);
    //       await user.save();

    //       Alert.alert(
    //         'Success!',
    //         'Your password has been successfully updated.'
    //       );

    //       // Redirect user to your desired screen after setting the new password
    //       navigation.navigate('Home');
    //     } catch (error) {
    //       Alert.alert('Error!', error.message);
    //     }
    //   };

    return (
        <View style={styles.container}>
            <Image
                style={{ width: 140, height: 140 }}
                source={require("../../assets/Logo.png")}
            />
            <View >
                <Text style={styles.head}>Reset Password</Text>
            </View>
            <View style={styles.form}>

                <Text style={styles.label}>{'OTP:'}</Text>
                <Text style={styles.buttonText}>{`sent to your email - ${props?.route?.params?.email}`}</Text>

                <View style={styles.containerOtp}>
                    {otp.map((digit, index) => (
                        <TextInput
                            key={index}
                            ref={inputRefs[index]}
                            style={styles.input}
                            value={digit}
                            onChangeText={(value) => handleInputChange(index, value)}
                            keyboardType="numeric"
                            maxLength={1}
                        />
                    ))}
                </View>
                {/* <OTPTextView
                    containerStyle={{ marginHorizontal: 16 }}
                    handleTextChange={(text) => setOtp(text)}
                    inputCount={4}
                    keyboardType="numeric"
                    //  defaultValue={OTP}
                    // borderWidth={0}
                    borderBottomWidth={2}
                    // backgroundColor={"grey"}
                    borderColor={"grey"}
                    // borderBottomWidth={0}
                    size={10}
                    // borderRadius={10}
                    width={65}
                    height={66}
                    tintColor={"#000"}
                /> */}

                <Text style={styles.label}>{'New password:'}</Text>
                <TextInput
                    style={styles.input}
                    secureTextEntry={true}
                    value={newPassword}
                    placeholder={'Enter new password'}
                    onChangeText={(text) => {
                        setNewPassword(text);
                        setPasswordsMatch(true);
                    }}
                    autoCapitalize={'none'}
                />
                {/* {!isValidPassword(newPassword) && (
          <Text style={styles.error}>
            {'New password must be at least 8 characters long.'}
          </Text>
        )} */}

                <Text style={styles.label}>{'Confirm password:'}</Text>
                <TextInput
                    style={styles.input}
                    secureTextEntry={true}
                    value={confirmPassword}
                    placeholder={'Confirm new password'}
                    onChangeText={(text) => {
                        setConfirmPassword(text);
                        if (text === newPassword) {
                            setPasswordsMatch(true);
                        } else {
                            setPasswordsMatch(false);
                        }
                    }}
                    autoCapitalize={'none'}
                />
                {!passwordsMatch && (
                    <Text style={styles.error}>{'New passwords do not match.'}</Text>
                )}

                <TouchableOpacity style={styles.button} onPress={() => handleSetPassword()}>
                    {/* <Text style={styles.buttonText}>{'Set new password'}</Text> */}
                </TouchableOpacity>
                <TouchableOpacity style={styles.reset} onPress={sendOtp}>
                    <Text style={{ color: '#fff', fontSize: 16 }}>Reset</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    form: {
        width: '80%',
    },
    label: {
        marginTop: 40,
        fontSize: 16,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 10,
        paddingHorizontal: 10,
    },
    head: {
        fontSize: 25,
        fontWeight: '800',
        color: Colors.buttonBackground
    },
    reset: {
        marginTop: 40, alignSelf: 'center',
        backgroundColor: Colors.buttonBackground,
        height: 40,
        width: 120,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        marginBottom: 10
    },
    containerOtp: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
    },
    inputOtp: {
        width: 40,
        height: 40,
        borderWidth: 1,
        borderRadius: 5,
        textAlign: 'center',
        fontSize: 18,
        marginHorizontal: 5,
    },
})