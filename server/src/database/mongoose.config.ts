import { MongooseModule } from '@nestjs/mongoose';
import mongoose from 'mongoose';

const uri =
  'mongodb+srv://Rangaiyan02:1234@cluster0.4ptozq4.mongodb.net/netflix-clone?retryWrites=true&w=majority&appName=Cluster0';

export const MongooseConfig = MongooseModule.forRoot(uri);

// Listen for successful connection or error
mongoose.connection.on('connected', () => {
  console.log('MongoDB connected successfully');
});

mongoose.connection.on('error', (error) => {
  console.error('MongoDB connection failed', error);
});
