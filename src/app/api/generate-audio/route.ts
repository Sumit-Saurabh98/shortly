// app/api/text-to-speech/route.ts
import { TextToSpeechClient } from '@google-cloud/text-to-speech';
import { NextResponse } from 'next/server';
import fs from 'fs';
import util from 'util';
import path from 'path';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '@/config/FirebaseConfig';

interface RequestBody {
  text: string;
  languageCode?: string;
  ssmlGender?: 'NEUTRAL' | 'MALE' | 'FEMALE';
}

// Create a single client instance outside the handler
const client = new TextToSpeechClient({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
  projectId: process.env.GOOGLE_PROJECT_ID,
});

export async function POST(request: Request) {
  try {
    // Parse the request body
    const body: RequestBody = await request.json();

    // firebase storage service

    const storageRef = ref(storage, `shortly-video/speech-${Date.now()}.mp3`);
    
    // Validate the request body
    if (!body.text) {
      return NextResponse.json(
        { error: 'Text is required' },
        { status: 400 }
      );
    }

    // Construct the request
    const ttsRequest = {
      input: { text: body.text },
      voice: {
        languageCode: body.languageCode || 'en-US',
        ssmlGender: body.ssmlGender || 'NEUTRAL',
      },
      audioConfig: { audioEncoding: 'MP3' as const },
    };

    // Perform the text-to-speech request
    const [response] = await client.synthesizeSpeech(ttsRequest);

    if (!response.audioContent) {
      throw new Error('Audio content is undefined');
    }

    const audioBuffer = Buffer.from(
      typeof response.audioContent === 'string' 
        ? response.audioContent 
        : new TextDecoder().decode(response.audioContent)
    );

    await uploadBytes(storageRef, audioBuffer, {contentType: 'audio/mp3'});

    const downloadedUrl = await getDownloadURL(storageRef);

    console.log(`Downloading audio from ${downloadedUrl}`);


    // Ensure the public directory exists
    // const publicDir = path.join(process.cwd(), 'public', 'audio');
    // if (!fs.existsSync(publicDir)) {
    //   fs.mkdirSync(publicDir, { recursive: true });
    // }

    // Generate a unique filename
    // const filename = `speech-${Date.now()}.mp3`;
    // const filepath = path.join(publicDir, filename);

    // Write the binary audio content to a file
    // const writeFile = util.promisify(fs.writeFile);
    // if (response.audioContent) {
    //     await writeFile(filepath, response.audioContent, 'binary');
    // } else {
    //     throw new Error('Audio content is undefined');
    // }

    // Return the path to the audio file
    return NextResponse.json({
      success: true,
      audioUrl: downloadedUrl,
    });

  } catch (error) {
    console.error('Text-to-speech error:', error);
    return NextResponse.json(
      { error: 'Failed to convert text to speech' },
      { status: 500 }
    );
  }
}