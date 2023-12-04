import { View, Text, StyleSheet, FlatList, Button, Pressable } from 'react-native';
import React, { useContext, useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';

import { AppStateContext } from '../src/utils/appContext';

export default function Home(props) {
  const { navigation } = props;
  const { data, onUpdate } = useContext(AppStateContext);
  const [showDatepicker, setShowDatepicker] = useState(false);
  const [date, setDate] = useState(new Date());

	const dataPerDate = data.filter( item => item.date === date.toLocaleDateString());

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShowDatepicker(false);
    setDate(currentDate);
  };

  return (
    <View style={styles.container}>
      <View>
        <Button onPress={() => setShowDatepicker(true)} title="Show date picker!" style={{ marginTop: 12 }} />
        <Text style={{ textAlign: 'center', marginTop: 4 }}>{date.toLocaleDateString()}</Text>
        {showDatepicker && (
          <DateTimePicker testID="dateTimePicker" value={date} mode={'date'} is24Hour={true} onChange={onChange} />
        )}

        <Text style={styles.title}>To Do</Text>
        <FlatList
          data={dataPerDate.filter((item) => item.category === 'todo')}
          renderItem={({ item }) => <Item item={item} onUpdate={() => onUpdate(item)} />}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.itemsContainer}
        />

        <Text style={styles.title}>Place to Go</Text>
        <FlatList
          data={dataPerDate.filter((item) => item.category === 'placeToGo')}
          renderItem={({ item }) => <Item item={item} onUpdate={() => onUpdate(item)} />}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.itemsContainer}
        />

        <Text style={styles.title}>Need to Talk</Text>
        <FlatList
          data={dataPerDate.filter((item) => item.category === 'needToTalk')}
          renderItem={({ item }) => <Item item={item} onUpdate={() => onUpdate(item)} />}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.itemsContainer}
        />
      </View>
      <View>
        <Text>Note: Tap on the Task to set it done.</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ height: 10, width: 10, backgroundColor: 'red', marginEnd: 4 }}></View>
          <Text>Done</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ height: 10, width: 10, backgroundColor: '#ecc8ae', marginEnd: 4 }}></View>
          <Text>To Do</Text>
        </View>
        <Button title="Add New Task" color="#821a92" onPress={() => navigation.navigate('Form')} />
      </View>
    </View>
  );
}

function Item({ item, onUpdate }) {
  return (
    <Pressable onPress={onUpdate}>
      <View style={{ ...styles.item, backgroundColor: item.done ? 'red' : '#ecc8ae' }}>
        <Text>{item.task}</Text>
        <Text style={{ paddingStart: 8 }}>{item.time}</Text>
      </View>
    </Pressable>
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
  title: {
    fontSize: 24,
    color: 'black',
    textAlign: 'left',
    marginTop: 20,
  },
  itemsContainer: {
    height: 150,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: 'pink',
    padding: 8,
    marginTop: 4,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 4,
    marginBottom: 4,
  },
});
