import React, { useState } from 'react';
import { View, TouchableOpacity, Modal, FlatList, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Metrics, Colors, Fonts } from '@constants';

import { Body1Text } from '../Texts';
import { NavButton } from '../Navigation';

const styles = {
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Metrics.Small,
  },
  modalNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: Metrics.Normal,
  },
  itemWrapper: {
    height: Metrics.Large,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  bodyText: {
    marginRight: Metrics.Small,
  }
}

export default ({ placeholder, placeholderTextColor, disabled, onChange, options, value }) => {
  const [ showModal, setShowModal ] = useState(false);
  const keyExtractor = (item) => `option_${item.value}`;
  const renderItem = ({ item }) => (
    <TouchableOpacity
      disabled={disabled}
      onPress={() => {
        setShowModal(false);
        onChange(item.value);
      }}
    >
      <View style={styles.itemWrapper}>
        <Body1Text
          color={value === item.value ? Colors.purple : Colors.black }
          fontFamily={Fonts.primaryBold}
        >
          {item.label}
        </Body1Text>
      </View>
    </TouchableOpacity>
  );
  const selectedOption = value ? options.find(({ value: val }) => val === value) : null;
  return (
    <>
      <TouchableOpacity onPress={() => setShowModal(true)} disabled={disabled}>
        <View style={styles.wrapper}>
          <Body1Text
            color={value ? Colors.black : placeholderTextColor}
            style={styles.bodyText}
          >
            {value ? selectedOption.label : placeholder || 'Select'}
          </Body1Text>
          <Ionicons name="md-arrow-dropdown" color={Colors.black} size={Metrics.Small} />
        </View>
      </TouchableOpacity>
      <Modal visible={showModal} onRequestClose={() => setShowModal(false)}>
        <View style={{ flex: 1 }}>
          <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.modalNav}>
              <NavButton type="close" onPress={() => setShowModal(false)} />
            </View>
            <View style={{ flex: 1, }}>
              <FlatList
                contentContainerStyle={{ paddingHorizontal: Metrics.Normal }}
                data={options}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
              />
            </View>
          </SafeAreaView>
        </View>
      </Modal>
    </>
  )
};
