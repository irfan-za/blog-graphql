# Blog GraphQL App

![screenshot](https://github.com/irfan-za/blog-graphql/blob/main/public/screenshot.png)
A modern blog application built with React, TypeScript, and Apollo Client that consumes the [GraphQLZero API](https://graphqlzero.almansi.me/api) to display and manage posts data.
**Link Demo:** https://blog-graphql-gold.vercel.app

## Description

This application demonstrates a complete GraphQL implementation with React, featuring:

- **Posts List** with URL-based pagination that persists on page refresh
- **Post Detail View** showing full content, author info, and comments
- **CRUD** Handle Create, Read, Update and Delete data post

## Tech Stack

- **React.js** - UI library
- **TypeScript** - Type safety
- **Apollo Client** - GraphQL data management and state
- **React Router DOM** - Client-side routing and navigation
- **GraphQL** - Query language for API
- **TailwindCss** - Styling
- **Jest** - unit testing

## Folder Structure

```
src/
├── apollo/
│   └── client.ts          # Apollo Client configuration
├── graphql/               # GraphQL queries and mutation
├── pages/
│   ├── PostsListPage.tsx  # Posts list with pagination
│   ├── PostDetailPage.tsx # Single post detail with comments
│   ├── CreatePostPage.tsx # Create new post form
│   └── UpdatePostPage.tsx # Create new post form
├── types/
│   └── index.ts           # TypeScript interfaces and types
├── App.tsx                # Main app with routing configuration
└── index.tsx              # App entry point with ApolloProvider
```

## Installation & Setup

```bash
# Install dependencies
yarn install

# Start development server
yarn start

# Build for production
yarn build
```

The app will open at [http://localhost:3000](http://localhost:3000)
