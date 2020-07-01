import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import CountryPicker, { DEFAULT_THEME, FlagButton, getAllCountries } from 'react-native-country-picker-modal';
import { Ionicons } from '@expo/vector-icons';

import { Colors, Metrics, Fonts, Images } from '@constants';

import { CaptionText, Body1Text } from '../Texts';

const renderFlagButton = (props) => (
  <View style={styles.flagButton}>
    <FlagButton {...props}/>
    <Ionicons
      style={styles.dropdownIcon}
      name="md-arrow-dropdown"
      color={Colors.black}
      size={Metrics.Big}
    />
  </View>
);

const renderItem = (onSelect, selected) => ({ item }) => {
  const { name } = item;
  return (
    <TouchableOpacity onPress={() => onSelect(item)}>
      <Body1Text
        style={{
          ...styles.countryItem,
          ...(item.cca2 === selected && styles.highlight)
        }}
      >
        {name}
      </Body1Text>
    </TouchableOpacity>
  )
};

const CountrySelector = (props) => {
  const {
    style,
    required,
    label,
    labelStyle,
    fontSize,
    borderColor,
    input,
    meta,
  } = props;

  const [ open, setOpen ] = useState(false);

  const onSelect = (country) => {
    setOpen(false);
    input.onChange(country.cca2);
  }

  const theme = {
    ...defaultTheme,
    fontSize,
    onBackgroundTextColor: (!open && !input.value) ? Colors.mediumLightGray : Colors.black,
  }
  return (
    <View style={[styles.default, style]}>
      {!!label && (
        <Text style={[styles.defaultLabel, labelStyle]}>{label}{required ? <Text style={{ color: Colors.red }}>*</Text> : ''}</Text>
      )}
      <View
        style={[
          styles.content,
          meta && meta.touched && meta.error ? styles.errorBorder : { borderColor },
        ]}
      >
        <CountryPicker
          countryCode={input.value}
          visible={open}
          withFilter
          withFlagButton={false}
          withFlag={false}
          withEmoji={false}
          withCountryNameButton
          withFilter
          withModal
          withCloseButton
          theme={theme}
          renderFlagButton={renderFlagButton}
          onOpen={() => { setOpen(true); }}
          onClose={() => { setOpen(false); }}
          filterProps={{ style: styles.filter }}
          closeButtonImage={Images.CloseIcon}
          closeButtonStyle={styles.closeButtonWrapper}
          closeButtonImageStyle={styles.closeButton}
          flatListProps={{
            renderItem: renderItem(onSelect, input.value),
            ItemSeparatorComponent: null,
            contentContainerStyle: styles.modalContent,
          }}
        />
      </View>
      {meta && meta.touched && meta.error && (
        <CaptionText color={Colors.red} style={styles.error}>{meta.error}</CaptionText>
      )}
    </View>
  );
}

CountrySelector.propTypes = {
  label: PropTypes.string,
  required: PropTypes.bool,
  color: PropTypes.string,
  fontSize: PropTypes.number,
  style: PropTypes.any, //eslint-disable-line
  labelStyle: PropTypes.any, //eslint-disable-line
  refFunc: PropTypes.func,
  borderColor: PropTypes.string,
  mask: PropTypes.any, //eslint-disable-line
};

CountrySelector.defaultProps = {
  label: null,
  propTypes: false,
  color: Colors.black,
  fontSize: 18,
  style: {},
  labelStyle: {},
  refFunc: null,
  borderColor: Colors.lightGray,
  mask: null,
};

const defaultTheme = {
  ...DEFAULT_THEME,
  fontFamily: Fonts.primary,
  filterPlaceholderTextColor: Colors.mediumLightGray,
  primaryColor: Colors.black,
  primaryColorVariant: Colors.mediumLightGray,
  onBackgroundTextColor: Colors.mediumLightGray,
};

const styles = StyleSheet.create({
  default: {
    //
  },
  defaultLabel: {
    color: Colors.mediumGray,
    fontSize: 12,
  },
  lightLabel: {
    color: Colors.mediumLightGray,
    opacity: 1,
    textTransform: "lowercase",
  },
  content: {
    height: 36,
    borderBottomColor: Colors.lightGray,
    height: 40,
    fontSize: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    alignItems: 'center',
  },
  errorBorder: {
    borderBottomColor: Colors.red,
  },
  input: {
    flex: 1,
    padding: 0,
    margin: 0,
    borderWidth: 0,
    fontFamily: Fonts.primary,
  },
  error: {
    paddingLeft: Metrics.Smaller,
    paddingTop: Metrics.Tiny,
  },
  flagButton: {
    position: 'relative',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'space-between'
  },
  dropdownIcon: {
    position: 'absolute',
    right: 10,
  },
  filter: {
    flex: 1,
    padding: Metrics.Small,
    marginRight: Metrics.Normal,
    backgroundColor: Colors.lightGrayOpacity,
    borderRadius: Metrics.Tiny,
    fontFamily: Fonts.primary,
    fontSize: Metrics.Normal,
    color: Colors.mediumGray,
    marginTop: Metrics.Big,
  },
  closeButton: {
    width: Metrics.Normal,
    height: Metrics.Normal,
    tintColor: Metrics.black,
  },
  closeButtonWrapper: {
    marginTop: Metrics.Big,
    width: Metrics.Big,
    height: Metrics.Big,
    padding: Metrics.Smaller,
    marginRight: Metrics.Normal,
    marginLeft: Metrics.Normal,
  },
  countryItem: {
    paddingVertical: Metrics.Normal,
    fontFamily: Fonts.primarySemiBold,
    color: Colors.black,
  },
  modalContent: {
    padding: Metrics.Normal,
  },
  highlight: {
    color: Colors.purple,
  }
});

CountrySelector.displayName = 'CountrySelector';

export default CountrySelector;
