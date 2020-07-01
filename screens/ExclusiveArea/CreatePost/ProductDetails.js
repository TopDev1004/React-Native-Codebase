import React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { Field, reduxForm } from 'redux-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { Metrics, Categories } from '@constants';
import {
  BaseScreen,
  GradientButton,
  NavBar,
  TextInput,
  Selector,
} from '@components';
import { submitPostData, setPostDetail } from '@actions';
import { Validators, Normalizers } from '@utils';

const styles = {
  wrapper: {
    flex: 1,
    marginBottom: Metrics.Normal,
  },
  title: {
    marginBottom: Metrics.Normal,
  },
  bodyText: {
    marginBottom: Metrics.Large,
  },
  button: {
    height: 40,
  },
}

class ProductDetails extends BaseScreen {

  handleBack = () => {
    this.props.navigation.goBack();
  }

  submitEditing = async (form) => {
    await this.props.submitPostData(form);
    this.props.navigation.navigate('Discover');
  }

  renderNavigation() {
    return (
      <NavBar left="back" onLeft={this.handleBack} />
    )
  }

  renderContent() {
    return (
      <View style={{ flex: 1 }}>
        <KeyboardAwareScrollView style={styles.wrapper}>
          <Field
            name="title"
            label="product title"
            component={TextInput}
            required
            validate={[Validators.required]}
            style={{ marginBottom: Metrics.Bigger }}
            props={{ placeholder: 'e.g. Nike Air Max 2090' }}
          />
          <Field
            name="url"
            label="product url"
            component={TextInput}
            required
            validate={[
              Validators.required,
              Validators.url,
            ]}
            style={{ marginBottom: Metrics.Bigger }}
            props={{
              placeholder: 'e.g. https://amazon....',
              description: 'Feel free to include your affiliate code!💸',
            }}
          />
          <Field
            name="price"
            label="price(USD)"
            component={TextInput}
            required
            validate={[
              Validators.required,
            ]}
            style={{ marginBottom: Metrics.Bigger }}
            format={Normalizers.price}
            props={{
              placeholder: 'e.g. $25',
              description: 'Get the price from your URL above and enter it here',
              keyboardType: 'decimal-pad',
            }}
          />

          <Field
            name="category"
            label="category"
            component={Selector}
            required
            validate={[
              Validators.required,
            ]}
            style={{ marginBottom: Metrics.Bigger }}
            props={{
              placeholder: 'Select category',
              options: Categories,
            }}
          />
        </KeyboardAwareScrollView>
        <GradientButton
          gradient="purpleGradient"
          height={40}
          fullWidth
          title="Post"
          onPress={this.props.handleSubmit(this.submitEditing)}
        />
      </View>
    )
  }
}

const mapDispatchToProps = { submitPostData, setPostDetail };

export default connect(null, mapDispatchToProps)(
  reduxForm({ form: 'product.detail' })(ProductDetails)
);
