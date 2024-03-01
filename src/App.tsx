/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  ActivityIndicator,
  Button,
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {realmContext} from './db';
import {Students} from './db/schemas/students.model';
import {IGrade, IStudent} from './interfaces/student';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

interface IProps extends TextInputProps {
  label?: string;
}

const Input = ({label, ...props}: IProps) => {
  return (
    <View style={{marginTop: 10, marginHorizontal: 10}}>
      {label && <Text>{label}</Text>}
      <View style={{borderWidth: 1}}>
        <TextInput {...props} />
      </View>
    </View>
  );
};

function AppWithRealm(): React.JSX.Element {
  const {useRealm} = realmContext;
  const realm = useRealm();

  useEffect(() => {
    globalThis.realm = realm;
  }, [realm]);

  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  // const [name, setName] = useState('');
  // const [rollNo, setRollNo] = useState<string | null>(null);
  // const [className, setClassName] = useState('');
  // const [mobile, setMobile] = useState('');

  // const [grade, setGrade] = useState('');
  // const [score, setScore] = useState('');
  // const [gradeSelected, setGradeSelected] = useState<IGrade | string>('');

  const [data, setData] = useState<IStudent[]>([]);
  const tempData = Students.all(realm);
  useEffect(() => {
    tempData.addListener(studentListener);

    return () => {
      tempData.removeListener(studentListener);
    };
  }, []);

  const studentListener = (updatedData: any) => {
    setData(JSON.parse(JSON.stringify(updatedData)));
  };

  const changeGrade = async (grade: IGrade | string, rollNo: string) => {
    await Students.changeGradeSingle({grade, rollNo}, realm);
  };

  const changeGradeByClass = async (
    grade: IGrade | string,
    className: string,
  ) => {
    await Students.changeGrade({className, grade}, realm);
  };

  return (
    <SafeAreaView style={{flex: 1, ...backgroundStyle}}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        {/* <Input value={rollNo ?? ''} onChangeText={setRollNo} label="Roll No" />
        <Input value={name} onChangeText={setName} label="Name" />
        <Input value={className} onChangeText={setClassName} label="Class" />
        <Input value={mobile} onChangeText={setMobile} label="Mobile" />
        <Input value={grade} onChangeText={setGrade} label="Grade" />
        <Input value={score} onChangeText={setScore} label="Score" /> */}

        {/* <Button
          title="Submit"
          onPress={async () => {
            const res = await Students.createAndUpdate(
              {
                className,
                mobile,
                name,
                rollNo: rollNo!,
                grade: grade,
                score: score,
              },
              realm,
            );
            if (res) {
              setName('');
              setRollNo(null);
              setClassName('');
              setMobile('');
              setGrade('');
              setScore('');
            }
          }}
        /> */}

        {/* <View style={{display: 'flex', flexDirection: 'row'}}>
          <Button
            title="A"
            color={gradeSelected === 'A' ? 'red' : ''}
            onPress={() => {
              setGradeSelected('A');
            }}
          />
          <Button
            title="B"
            color={gradeSelected === 'B' ? 'red' : ''}
            onPress={() => {
              setGradeSelected('B');
            }}
          />
          <Button
            title="C"
            color={gradeSelected === 'C' ? 'red' : ''}
            onPress={() => {
              setGradeSelected('C');
            }}
          />
          <Button
            title="D"
            color={gradeSelected === 'D' ? 'red' : ''}
            onPress={() => {
              setGradeSelected('D');
            }}
          />
        </View> */}

        <FlatList
          data={data}
          renderItem={({item}) => {
            return (
              <View style={{borderWidth: 1}}>
                <Text>className: {item.className}</Text>
                <Text>grade: {item.grade}</Text>
                <Text>mobile: {item.mobile}</Text>
                <Text>name: {item.name}</Text>
                <Text>score: {item.score}</Text>
                <Text>RollNo: {item.rollNo}</Text>

                <View style={{display: 'flex', flexDirection: 'row'}}>
                  {item.grade !== 'A' && (
                    <Button
                      title="A"
                      // color={gradeSelected === 'A' ? 'red' : ''}
                      onPress={() => {
                        changeGrade('A', item.rollNo);
                      }}
                    />
                  )}
                  {item.grade !== 'B' && (
                    <Button
                      title="B"
                      // color={gradeSelected === 'B' ? 'red' : ''}
                      onPress={() => {
                        changeGrade('B', item.rollNo);
                      }}
                    />
                  )}
                  {item.grade !== 'C' && (
                    <Button
                      title="C"
                      // color={gradeSelected === 'C' ? 'red' : ''}
                      onPress={() => {
                        changeGrade('C', item.rollNo);
                      }}
                    />
                  )}
                  {item.grade !== 'D' && (
                    <Button
                      title="D"
                      // color={gradeSelected === 'D' ? 'red' : ''}
                      onPress={() => {
                        changeGrade('D', item.rollNo);
                      }}
                    />
                  )}
                </View>

                <View style={{display: 'flex', flexDirection: 'row'}}>
                  {item.grade !== 'A' && (
                    <Button
                      title="A"
                      // color={gradeSelected === 'A' ? 'red' : ''}
                      onPress={() => {
                        changeGradeByClass('A', item.className);
                      }}
                    />
                  )}
                  {item.grade !== 'B' && (
                    <Button
                      title="B"
                      // color={gradeSelected === 'B' ? 'red' : ''}
                      onPress={() => {
                        changeGradeByClass('B', item.className);
                      }}
                    />
                  )}
                  {item.grade !== 'C' && (
                    <Button
                      title="C"
                      // color={gradeSelected === 'C' ? 'red' : ''}
                      onPress={() => {
                        changeGradeByClass('C', item.className);
                      }}
                    />
                  )}
                  {item.grade !== 'D' && (
                    <Button
                      title="D"
                      // color={gradeSelected === 'D' ? 'red' : ''}
                      onPress={() => {
                        changeGradeByClass('D', item.className);
                      }}
                    />
                  )}
                </View>

                <Button
                  title="DELETE"
                  onPress={async () => {
                    await Students.delete(item.rollNo, realm);
                  }}
                />
              </View>
            );
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

function App(): React.JSX.Element {
  const {RealmProvider} = realmContext;

  return (
    <RealmProvider fallback={() => <ActivityIndicator />}>
      <AppWithRealm />
    </RealmProvider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
