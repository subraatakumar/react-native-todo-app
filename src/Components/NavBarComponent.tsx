import React from 'react';
import {StyleSheet, Text, View, Pressable} from 'react-native';
import {ArrowLeft2, ArrowRight2} from 'iconsax-react-native';
import {format} from 'date-fns';
// import {useContextProvider} from '../AppContextProvider';
import {addDays} from 'date-fns';
import {todoStore} from '../App';
import {observer} from 'mobx-react-lite';

export const NavBarComponent = observer(() => {
  return (
    <View style={styles.navBar}>
      <Pressable onPress={() => todoStore.handleDateChange(-1)}>
        <ArrowLeft2 size={32} color="#000000" />
      </Pressable>
      <Text style={styles.navBarDateStyle}>
        {format(todoStore.navBarDate, 'dd/MM/yyyy')}
      </Text>
      <Pressable onPress={() => todoStore.handleDateChange(+1)}>
        <ArrowRight2 size={32} color="#000000" />
      </Pressable>
    </View>
  );
});

const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 14,
  },
  navBarDateStyle: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: 24,
    color: '#000000',
  },
});
