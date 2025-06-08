import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Text,
  TouchableWithoutFeedback,
  View,
  TextInput,
  Button,
  Platform,
} from "react-native";
import { Picker } from '@react-native-picker/picker';
import { SafeAreaView } from "react-native-safe-area-context";

const ProfileForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <TouchableWithoutFeedback>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <View style={{ flex: 1, padding: 24 }}>
            <Text style={{ fontWeight: "bold", fontSize: 18, marginBottom: 4 }}>
              Complete your profile
            </Text>
            <Text style={{ color: "#888", marginBottom: 24 }}>
              what would you like your buddies to call you?
            </Text>

            <Text style={{ marginBottom: 4 }}>First Name *</Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: "#ddd",
                borderRadius: 8,
                padding: 12,
                marginBottom: 16,
              }}
              placeholder="First Name"
              value={firstName}
              onChangeText={setFirstName}
            />

            <Text style={{ marginBottom: 4 }}>Last Name</Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: "#ddd",
                borderRadius: 8,
                padding: 12,
                marginBottom: 16,
              }}
              placeholder="Last Name"
              value={lastName}
              onChangeText={setLastName}
            />

            <Text style={{ marginBottom: 4 }}>Gender</Text>
            <View
              style={{
                borderWidth: 1,
                borderColor: "#ddd",
                borderRadius: 8,
                marginBottom: 16,
                overflow: "hidden",
              }}
            >
              <Picker
                selectedValue={gender}
                onValueChange={setGender}
                style={{ height: 44 }}
              >
                <Picker.Item label="Select Gender" value="" />
                <Picker.Item label="Male" value="male" />
                <Picker.Item label="Female" value="female" />
                <Picker.Item label="Other" value="other" />
              </Picker>
            </View>

            <Text style={{ marginBottom: 4 }}>Date of Birth</Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: "#ddd",
                borderRadius: 8,
                padding: 12,
                marginBottom: 24,
              }}
              placeholder="YYYY-MM-DD"
              value={dob}
              onChangeText={setDob}
              keyboardType="numeric"
            />

            <Button
              title="NEXT"
              onPress={() => {}}
              disabled={!firstName}
              color="#ccc"
            />
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default ProfileForm;
