import {
  Appearance,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {Slider} from '@miblanchard/react-native-slider';

const colorScheme = Appearance.getColorScheme();

export default function App() {
  const [password, setPassword] = useState('');
  const [isPasswordGenerated, setIsPasswordGenerated] = useState(false);

  const [passwordLength, setPasswordLength] = useState(10);
  const [lowerCase, setLowerCase] = useState(true);
  const [upperCase, setUpperCase] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [symbols, setSymbols] = useState(false);

  const generatedPasswordString = () => {
    let charList = '';

    const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCaseChars = 'abcedfgjo';
    const digitChars = '123456789';
    const specialChars = '!@#$%^&*()_+';

    if (upperCase) {
      charList += upperCaseChars;
    }
    if (lowerCase) {
      charList += lowerCaseChars;
    }
    if (numbers) {
      charList += digitChars;
    }
    if (symbols) {
      charList += specialChars;
    }

    const passwordResult = createPassword(charList);

    setPassword(passwordResult);
    setIsPasswordGenerated(true);
  };

  const createPassword = (characters: string) => {
    let result: string = '';
    for (let i = 0; i < passwordLength; i++) {
      const characterIndex: number = Math.round(
        Math.random() * characters.length,
      );
      result += characters.charAt(characterIndex);
    }
    return result;
  };

  const resetPasswordState = () => {
    setPassword('');
    setIsPasswordGenerated(false);
    setPasswordLength(10);
    setLowerCase(true);
    setUpperCase(false);
    setNumbers(false);
    setSymbols(false);
  };

  return (
    <>
      <ScrollView keyboardShouldPersistTaps="handled">
        <SafeAreaView style={styles.container}>
          <Text style={styles.mainHeading}>Password Generator</Text>

          <View style={styles.inputWrapper}>
            <Text style={styles.heading}>Password Length</Text>
            <Text style={styles.passwordLength}>{passwordLength}</Text>
          </View>
          <View style={styles.slider}>
            <Slider
              value={passwordLength}
              onValueChange={value => setPasswordLength(Math.round(value[0]))}
              minimumValue={8}
              maximumValue={16}
              thumbTintColor="skyblue"
              minimumTrackTintColor="skyblue"
              step={1}
            />
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.heading}>Include Lowercase Letters</Text>
            <BouncyCheckbox
              disableBuiltInState
              isChecked={lowerCase}
              onPress={() => setLowerCase(!lowerCase)}
              fillColor="skyblue"
            />
          </View>
          <View style={styles.inputWrapper}>
            <Text style={styles.heading}>Include Uppercase Letters</Text>
            <BouncyCheckbox
              disableBuiltInState
              isChecked={upperCase}
              onPress={() => setUpperCase(!upperCase)}
              fillColor="skyblue"
            />
          </View>
          <View style={styles.inputWrapper}>
            <Text style={styles.heading}>Include Numbers</Text>
            <BouncyCheckbox
              disableBuiltInState
              isChecked={numbers}
              onPress={() => setNumbers(!numbers)}
              fillColor="skyblue"
            />
          </View>
          <View style={styles.inputWrapper}>
            <Text style={styles.heading}>Include Symbols</Text>
            <BouncyCheckbox
              disableBuiltInState
              isChecked={symbols}
              onPress={() => setSymbols(!symbols)}
              fillColor="skyblue"
            />
          </View>

          <View style={styles.buttons}>
            <TouchableOpacity
              onPress={generatedPasswordString}
              style={[styles.button, styles.generateBtn]}>
              <Text style={[styles.btnText, styles.generateBtnText]}>
                Generate Password
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={resetPasswordState}
              style={[styles.button, styles.resetBtn]}>
              <Text style={styles.btnText}>Reset</Text>
            </TouchableOpacity>
          </View>

          {isPasswordGenerated ? (
            <View style={styles.card}>
              <Text style={styles.subTitle}>Generated Password</Text>
              <Text selectable={true} style={styles.password}>
                {password}
              </Text>
              <Text style={styles.description}>Long Press to Copy</Text>
            </View>
          ) : null}
        </SafeAreaView>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  mainHeading: {
    fontSize: 24,
    fontWeight: '600',
    marginVertical: 12,
  },
  heading: {
    fontSize: 18,
  },
  slider: {
    marginBottom: 16,
  },
  inputWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  passwordLength: {
    paddingHorizontal: 10,
    fontSize: 20,
  },
  buttons: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 14,
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 6,
  },
  generateBtn: {
    backgroundColor: colorScheme === 'dark' ? '#0784b5' : '#39ace7',
    flex: 2,
  },
  generateBtnText: {
    color: colorScheme === 'dark' ? '#fff' : '#fff',
  },
  resetBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'grey',
  },
  btnText: {
    fontSize: 18,
    textAlign: 'center',
  },
  card: {
    backgroundColor: colorScheme === 'dark' ? 'grey' : '#eee',
    marginVertical: 20,
    borderRadius: 6,
    padding: 10,
    justifyContent: 'center',
  },
  subTitle: {
    fontSize: 18,
    textAlign: 'center',
  },
  password: {
    fontSize: 26,
    paddingVertical: 10,
    textAlign: 'center',
  },
  description: {
    textAlign: 'center',
  },
});
