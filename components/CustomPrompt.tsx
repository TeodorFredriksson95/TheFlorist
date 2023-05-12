import React, { useEffect, useState } from 'react';
import { Modal, View, Text, TouchableOpacity, TextInput } from 'react-native';

interface CustomPromptProps {
  visible: boolean;
  title: string;
  message: string;
  onCancel: () => void;
  onOk: (input: string) => void;
}

const CustomPrompt: React.FC<CustomPromptProps> = ({ visible, title, message, onCancel, onOk }) => {
  const [input, setInput] = useState<string>('');

  return (
    <Modal visible={visible} transparent={true}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ padding: 20, backgroundColor: 'white', borderRadius: 10 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{title}</Text>
          <Text style={{ marginVertical: 10 }}>{message}</Text>
          <TextInput
            style={{ borderColor: 'gray', borderWidth: 1, borderRadius: 5, paddingHorizontal: 10 }}
            value={input}
            onChangeText={setInput}
          />
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 15 }}>
            <TouchableOpacity onPress={onCancel}>
              <Text style={{ fontSize: 16, color: 'red' }}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onOk(input)}>
              <Text style={{ fontSize: 16, color: 'blue' }}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CustomPrompt;
