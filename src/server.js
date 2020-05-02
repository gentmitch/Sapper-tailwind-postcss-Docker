import sirv from 'sirv';
import express from 'express';
import compression from 'compression';
import bodyParser from 'body-parser';
import session from 'express-session';
import sessionFileStore from 'session-file-store';
import * as sapper from '@sapper/server';
// import './tailwind.css'

const {
	PORT,
	NODE_ENV
} = process.env;

const dev = NODE_ENV === 'production';

const FileStore = sessionFileStore(session);

const app = express() // You can also use Express
	.use(
		session({
			secret: 'conduit',
			resave: false,
			saveUninitialized: true,
			cookie: {
				maxAge: 31536000
			},
			store: new FileStore({
				path: process.env.NOW ? `/tmp/sessions` : `.sessions`
			})
		})
	)
	.use(
		compression({
			threshold: 0
		}),
		sirv('static', {
			dev
		}),
		sapper.middleware({
			session: req => ({
				user: req.session && req.session.user
			})
		})
	)
	.listen(PORT, err => {
		if (err) console.log('error', err);
	});
export default app