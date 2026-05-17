# Phishing Detector

This project is a full-stack AI-powered phishing detection system designed to help users identify potentially malicious or suspicious messages in real time. It uses a React + Vite frontend and a FastAPI backend integrated with OpenAI to analyze text and classify it as safe, spam, or phishing.

# How it works
Just paste an email, and the system sends it to a backend API. The backend processes the input using an AI model and returns a risk classification along with a brief explanation of why the message may be suspicious.

The criteria I used was:
  Check for urgent language
  Look for fake login links
  Verify sender email domain
  Be cautious of password reset requests

Expectations of the analysis are:
  Risk score on a range 1-10,
  Attack type eg. Credential harvest
  Phishing indicators eg. Suspicious sender email domain not matching official institution(gvsu)
  Social engineering tactics eg. Impersonation of an official enrollment form to entice clicks
  Recommended_action like Do not click the link

# Goal of the project 
This project is built as a cybersecurity awareness tool to demonstrate how AI can be used to detect phishing attempts and educate users on identifying social engineering attacks.

# Tech stack I used
Frontend: React, Vite, JavaScript
Backend: FastAPI (Python)
AI: OpenAI API
Deployment: Vercel (frontend), Render (backend)
