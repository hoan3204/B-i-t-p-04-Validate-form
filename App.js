import React, { useState, useEffect } from 'react';
import {
  StyleSheet, Text, TextInput, TouchableOpacity,
  View, KeyboardAvoidingView, Platform
} from 'react-native';

export default function App() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');

  // useEffect để kiểm tra khi phoneNumber thay đổi
  useEffect(() => {
    if (phoneNumber.length > 0) {
      validatePhoneNumber(phoneNumber);
    }
  }, [phoneNumber]);

  // Hàm kiểm tra số điện thoại (Việt Nam: 10 số, bắt đầu bằng 0)
  const validatePhoneNumber = (text) => {
    const phoneRegex = /^0[0-9]{9}$/;
    if (!phoneRegex.test(text)) {
      setError('Số điện thoại không hợp lệ');
    } else {
      setError('');
    }
  };

  // Hàm xử lý định dạng số điện thoại tự động
  const formatPhoneNumber = (text) => {
    let formatted = text.replace(/\D/g, ''); // Chỉ giữ lại số
    formatted = formatted.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3'); // Thêm dấu cách
    return formatted.trim();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Phần tiêu đề */}
      <View style={styles.header}>
        <Text style={styles.title}>Đăng nhập</Text>
      </View>

      {/* Phần nội dung */}
      <View style={styles.content}>
        <Text style={styles.subtitle}>Nhập số điện thoại</Text>
        <Text style={styles.description}>
          Dùng số điện thoại để đăng nhập hoặc đăng ký tài khoản tại OneHousing Pro
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Nhập số điện thoại của bạn"
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />


        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: phoneNumber && !error ? '#007AFF' : '#E0E0E0' },
          ]}
          disabled={!phoneNumber || error.length > 0} // LUÔN ĐẢM BẢO TRẢ VỀ BOOLEAN
          onPress={() => alert(`Số điện thoại của bạn là: ${phoneNumber}`)}
        >

          <Text style={styles.buttonText}>Tiếp tục</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 80,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    fontSize: 16,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
  },
  button: {
    height: 50,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});
