import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import React, { useContext, useLayoutEffect, useState } from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import DateTimePicker from '@react-native-community/datetimepicker';
import { CATEGORIES } from '../src/constants';
import { AppStateContext } from '../src/utils/appContext';

export default function Form(props) {
  const { navigation } = props;
  const { addTask } = useContext(AppStateContext);

  const [task, setTask] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0].id);

  const [date, setDate] = useState(new Date(Date.now() + 10 * 60 * 1000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Add Task',
    });
  }, [navigation]);

  const onSubmit = () => {
    const data = {
      id: task + category,
      task: task,
      time: date.toLocaleTimeString(),
      date: date.toLocaleDateString(),
      fullDate: date,
      done: false,
      category: category,
    };
    addTask(data);

    navigation.goBack();
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.inputContainer}>
          <Text>Select Date</Text>
          <Text>selected: {date.toLocaleDateString()}</Text>
          <Button onPress={showDatepicker} title="Show date picker!" style={{ marginTop: 12 }} />
        </View>
        <View style={styles.inputContainer}>
          <Text>Task Details</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setTask(text)}
            value={task}
            placeholder="Enter Task Details"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text>Select Category</Text>
          <SelectDropdown
            data={CATEGORIES}
            onSelect={(selectedItem) => {
              setCategory(selectedItem.id);
            }}
            defaultValue={CATEGORIES[0]}
            buttonTextAfterSelection={(item) => item.displayName}
            rowTextForSelection={(item) => item.displayName}
            buttonStyle={styles.selectInput}
            buttonTextStyle={{
              textAlign: 'left',
            }}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text>Select Time</Text>
          <Text>selected: {date.toLocaleTimeString()}</Text>
          <Button onPress={showTimepicker} title="Show time picker!" style={{ marginTop: 12 }} />
        </View>
        {show && (
          <DateTimePicker testID="dateTimePicker" value={date} mode={mode} is24Hour={true} onChange={onChange} />
        )}
      </View>
      <Button title="Add" color="#821a92" onPress={onSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: 'white',
    padding: 16,
    justifyContent: 'space-between',
  },
  inputContainer: {
    marginTop: 16,
  },
  input: {
    height: 40,
    marginTop: 4,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
  },
  selectInput: {
    height: 40,
    marginTop: 4,
    borderWidth: 1,
    borderRadius: 4,
    width: '100%',
    backgroundColor: 'white',
  },
});
