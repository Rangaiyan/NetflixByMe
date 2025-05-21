import { UpdateMovieDto } from './dto/updateMovie.dto';
import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Movie, MovieDocument } from '../../schemas/Movieschema/movies.schema';
import { CreateMovieDto } from './dto/crateMovie.dto';
import { validateImage } from '../../utils/functions';
import { v2 as Cloudinary } from 'cloudinary';
import { cloudinaryDto } from './dto/cloudinary.dto';

@Injectable()
export class MovieService {
  constructor(
    @InjectModel(Movie.name) private readonly movieModel: Model<MovieDocument>,
    @Inject('CLOUDINARY') private cloudinary: typeof Cloudinary,
  ) {}

  async uploadToCloudinary(file: Express.Multer.File): Promise<cloudinaryDto> {
    return new Promise((resolve, reject) => {
      if (!this.cloudinary || !this.cloudinary.uploader) {
        reject(new Error('Cloudinary instance is not properly initialized'));
        return;
      }

      const uploadStream = this.cloudinary.uploader.upload_stream(
        { folder: '' },
        (error, result) => {
          if (error) {
            reject(new Error(error.message || 'Cloudinary upload error'));
          } else {
            resolve(result as cloudinaryDto);
          }
        }
      );

      uploadStream.end(file.buffer);
    });
  }

  async create(
    image: Express.Multer.File,
    createMovieDto: CreateMovieDto,
  ): Promise<Movie> {
    try {
      validateImage(image);
      const result = await this.uploadToCloudinary(image);
      console.log(result.secure_url);

      console.log('Cloudinary URL:', result.secure_url);
      console.log('DTO:', createMovieDto);

      const movie = new this.movieModel({
        ...createMovieDto,
        imageUrl: result.secure_url,
      });

      return await movie.save();
    } catch (error) {
      console.error('Error:', error?.message || error);
      throw new BadRequestException(
        error?.message || 'Failed to upload image or save movie data.',
      );
    }
  }

  async createMany(movies: CreateMovieDto[]) {
    let count = 0;
    const batchSize = 500;
    const totalBatches = Math.ceil(movies.length / batchSize);
    let docsSaved = 0;
    try {
      for (let i = 0; i < totalBatches; i++) {
        const sliced = movies.slice(count, count + batchSize);
        count += batchSize;

        if (sliced.length > 0) {
          const inserted = await this.movieModel.collection.insertMany(sliced);
          docsSaved += inserted.insertedCount ?? 0;
        }
      }

      console.log('Total Movie inserted: ', docsSaved);

      return { inserted: docsSaved, total: movies.length };
    } catch (error) {
      console.error('Error in inserting movies:', error);
      throw new InternalServerErrorException('Failed to insert movies');
    }
  }

  async update(id: string, updateMovieDto: UpdateMovieDto): Promise<Movie> {
    try {
      const update = await this.movieModel.findByIdAndUpdate(
        id,
        updateMovieDto,
        {
          new: true,
        },
      );
      if (!update) throw new NotFoundException('Movie not found');
      else console.log('Movie updated');
      return update;
    } catch (error) {
      throw error;
    }
  }

  async deleteById(id: string): Promise<Movie> {
    try {
      const deleted = await this.movieModel.findByIdAndDelete(id);
      if (!deleted) throw new NotFoundException('Movie not found');
      else {
        console.log('Movie deleted');
      }
      ``;
      return deleted;
    } catch (e) {
      throw e;
    }
  }
  async deleteAll(): Promise<{ deletedCount: number }> {
    try {
      const result = await this.movieModel.deleteMany({});
      console.log(`Deleted ${result.deletedCount} movies.`);
      return { deletedCount: result.deletedCount };
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete all movies');
    }
  }

  async findAll(): Promise<Movie[]> {
    return this.movieModel.find();
  }

  async findByGenre(genre: string): Promise<Movie[]> {
    const movieByGenre = await this.movieModel.find({ genre });
    if (movieByGenre.length == 0) {
      throw new NotFoundException('there is no movie in this genre');
    }
    return movieByGenre;
  }
  async findByLanguage(language: string): Promise<Movie[]> {
    const movieByLang = await this.movieModel.find({ language });
    if (movieByLang.length == 0) {
      throw new NotFoundException('there is no movie in this language');
    }
    return movieByLang;
  }

  async findOne(id: string): Promise<Movie> {
    const movie = await this.movieModel.findById(id);
    if (!movie) throw new NotFoundException('Movie not found');
    return movie;
  }

  async search(query: string): Promise<Movie[]> {
    const regex = new RegExp(query, 'i');
    const movie = await this.movieModel.find({
      $or: [
        { title: regex },
        { description: regex },
        { director: regex },
        { genre: regex },
        { language: regex },
      ],
    });
    if (movie.length == 0) {
      console.log('no movies were found');
    }
    return movie;
  }

  async findAllWithPagination(options) {
    const { limit, page, sort, orderBy } = options;
    try {
      const skipPages = (page - 1) * limit;

      const result = await this.movieModel.aggregate([
        {
          $sort: { [sort]: orderBy === 'asc' ? 1 : -1 },
        },
        {
          $facet: {
            data: [{ $skip: skipPages }, { $limit: limit }],
            totalCount: [{ $count: 'count' }],
          },
        },
      ]);

      const data = result[0].data;
      const totalMovie = result[0].totalCount[0]?.count || 0;

      return {
        data,
        totalMovie,
        Inpage: page,
        moviesInSinglePage: limit,
        totalPage: Math.ceil(totalMovie / limit),
      };
    } catch (error) {
      console.error('Pagination error:', error);
      throw new InternalServerErrorException('Failed to paginate movies');
    }
  }

 async getTrendingMovies(): Promise<Movie[]> {
    return this.movieModel
      .find()
      .sort({ viewsCount: -1 })
      .limit(10)
      .exec();
  }



}
