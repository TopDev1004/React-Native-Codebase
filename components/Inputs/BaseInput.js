import React, { useState } from 'react';
import { TextInput } from 'react-native';

const BaseInput = ({ value, onChange, ...props }) => (
    <TextInput
      value={value}
      onChange={onChange}
      autoCapitalize="none"
      {...props}
    />
  );

BaseInput.displayName = 'BaseInput';

export default BaseInput;