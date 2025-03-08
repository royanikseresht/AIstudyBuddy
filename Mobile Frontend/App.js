import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, Image } from "react-native";
import { Button, RadioButton } from "react-native-paper";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import axios from "axios";
import Ionicons from 'react-native-vector-icons/Ionicons';

// API URL for summarization
const API_URL = "https://208a-2a09-bac1-1e40-628-00-3a5-20.ngrok-free.app/summarize";

// Home Screen Component
function HomeScreen() {
  const [text, setText] = useState("");
  const [length, setLength] = useState("medium");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {
    if (!text) return;
    setLoading(true);
    try {
      const response = await axios.post(API_URL, { text, length });
      setSummary(response.data.summary || "Error summarizing text.");
    } catch (error) {
      setSummary("Failed to fetch summary.");
    }
    setLoading(false);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>Text Summarizer</Text>
          <TextInput
            style={styles.input}
            multiline
            placeholder="Enter text to summarize..."
            value={text}
            onChangeText={setText}
          />
          <RadioButton.Group onValueChange={setLength} value={length}>
            <View style={styles.radioContainer}>
              {["short", "medium", "detailed"].map((option) => (
                <View key={option} style={styles.radio}>
                  <RadioButton value={option} />
                  <Text style={styles.radioText}>{option}</Text>
                </View>
              ))}
            </View>
          </RadioButton.Group>
          <Button mode="contained" onPress={handleSummarize} loading={loading} style={styles.button}>
            Summarize
          </Button>
          {summary ? <Text style={styles.summary}>{summary}</Text> : null}
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

// Get To Know Me Screen Component
function GetToKnowMeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Get To Know Me</Text>
      <Image source={require('./assets/images/profile.jpg')} style={styles.avatar} />
      <Text style={styles.aboutText}>
        Hello! I'm the creator of this app. I am passionate about technology, especially in the areas of AI and machine learning. 
        I believe in using technology to make life easier and more efficient, which is why I created this Text Summarizer app.
      </Text>
      <Text style={styles.aboutText}>Feel free to get in touch with me if you have any questions or just want to talk about technology!</Text>
    </View>
  );
}

// About Screen Component
function AboutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.aboutTitle}>About This App</Text>
      <Text style={styles.aboutText}>
        The Text Summarizer App allows users to quickly generate summaries for large blocks of text. 
        It offers different summarization lengths, including short, medium, and detailed summaries.
      </Text>
    </View>
  );
}

// Contact Screen Component
function ContactScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.contactTitle}>Contact Us</Text>
      <Text style={styles.contactText}>
        For any queries or feedback, please reach out to us at:
      </Text>
      <Text style={styles.contactEmail}>rn211@student.london.ac.uk</Text>
    </View>
  );
}

// Bottom Tab Navigator
const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator 
        screenOptions={{
          tabBarStyle: { backgroundColor: '#fff' },
          tabBarActiveTintColor: '#ccc',
          tabBarInactiveTintColor: '#888',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="About"
          component={AboutScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="information-circle" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Contact"
          component={ContactScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="call" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Get To Know Me"
          component={GetToKnowMeScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, justifyContent: "center", backgroundColor: "#f5f5f5" },
  title: { fontSize: 30, fontWeight: "bold", marginBottom: 20, textAlign: 'center', color: "#333" },
  pageTitle: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: 'center', color: "#333" },
  avatar: { width: 100, height: 100, borderRadius: 50, marginBottom: 20, alignSelf: 'center' },
  input: { 
    borderWidth: 1, 
    borderColor: "#ddd", 
    padding: 15, 
    marginBottom: 20, 
    borderRadius: 10, 
    backgroundColor: "#fff", 
    fontSize: 16, 
    height: 120, 
    textAlignVertical: "top" 
  },
  radioContainer: { flexDirection: "row", justifyContent: "space-around", marginBottom: 20 },
  radio: { flexDirection: "row", alignItems: "center" },
  radioText: { fontSize: 16, color: "#555" },
  button: { marginTop: 20, borderRadius: 10 },
  summary: { marginTop: 20, fontSize: 16, fontStyle: "italic", color: "#333" },
  aboutTitle: { fontSize: 24, fontWeight: "bold", color: "#2e2e2e", textAlign: 'center' },
  aboutText: { fontSize: 16, textAlign: 'center', margin: 20, color: "#555" },
  contactTitle: { fontSize: 24, fontWeight: "bold", color: "#2e2e2e", textAlign: 'center' },
  contactText: { fontSize: 16, textAlign: 'center', margin: 20, color: "#555" },
  contactEmail: { 
    fontSize: 16, 
    textAlign: 'center', 
    color: "#6200ea", 
    textDecorationLine: 'underline' 
  },
});

export default App;

//npx expo start -c
//ngrok http 8000
