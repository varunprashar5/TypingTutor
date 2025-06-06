# React Query Demo App

A comprehensive React.js application demonstrating the power and features of **TanStack Query** (formerly React Query) for efficient data fetching, caching, and state management.

## 🚀 Features

This application showcases the following TanStack Query features:

- **Data Fetching**: Efficient API calls with automatic loading states
- **Caching**: Intelligent data caching with configurable stale times
- **Mutations**: Create and delete operations with optimistic updates
- **Error Handling**: Comprehensive error states and user feedback
- **Refetching**: Manual and automatic data refetching
- **Query Invalidation**: Smart cache invalidation after mutations
- **Loading States**: Beautiful loading indicators and disabled states
- **DevTools**: Integrated React Query DevTools for debugging

## 🛠️ Technologies Used

- **React 18** - Modern React with hooks
- **TanStack Query v5** - Powerful data synchronization for React
- **Axios** - HTTP client for API requests
- **JSONPlaceholder** - Fake REST API for testing
- **Modern CSS** - Beautiful, responsive design with gradients and animations

## 📦 Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd react-query-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

## 🏗️ Project Structure

```
src/
├── App.js          # Main application component with TanStack Query examples
├── App.css         # Modern, responsive styling
├── index.js        # App entry point with QueryClient setup
└── ...
```

## 🔧 TanStack Query Configuration

The app is configured with optimal default settings:

```javascript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 10, // 10 minutes
    },
  },
});
```

## 📚 Key Components

### 1. PostsList Component
- Fetches and displays a list of posts
- Implements delete functionality with mutations
- Shows loading and error states
- Includes manual refetch capability

### 2. PostDetails Component
- Modal component for viewing individual post details
- Demonstrates conditional queries with `enabled` option
- Efficient data fetching with query keys

### 3. CreatePost Component
- Form for creating new posts
- Uses mutations with success/error handling
- Automatic cache invalidation after successful creation
- Form validation and user feedback

## 🎯 TanStack Query Concepts Demonstrated

### Queries
```javascript
const { data, isLoading, error, refetch } = useQuery({
  queryKey: ['posts'],
  queryFn: fetchPosts,
});
```

### Mutations
```javascript
const createMutation = useMutation({
  mutationFn: createPost,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['posts'] });
  },
});
```

### Query Invalidation
```javascript
queryClient.invalidateQueries({ queryKey: ['posts'] });
```

### Conditional Queries
```javascript
const { data: post } = useQuery({
  queryKey: ['post', postId],
  queryFn: () => fetchPost(postId),
  enabled: !!postId,
});
```

## 🎨 UI Features

- **Modern Design**: Beautiful gradient backgrounds and glassmorphism effects
- **Responsive Layout**: Works perfectly on desktop and mobile devices
- **Smooth Animations**: Hover effects and transitions for better UX
- **Loading States**: Elegant loading indicators and skeleton screens
- **Error Handling**: User-friendly error messages and retry options
- **Modal Interface**: Clean modal for viewing post details

## 🔍 DevTools

The app includes TanStack Query DevTools for debugging:
- View all queries and their states
- Inspect cache contents
- Monitor network requests
- Debug query invalidations

Access the DevTools by clicking the TanStack Query icon in the bottom corner of the app.

## 📱 Responsive Design

The application is fully responsive and includes:
- Mobile-first CSS approach
- Flexible grid layouts
- Touch-friendly buttons and interactions
- Optimized modal experience on mobile

## 🚀 Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

## 🌐 API Integration

The app uses [JSONPlaceholder](https://jsonplaceholder.typicode.com/) for demo data:
- `GET /posts` - Fetch all posts
- `GET /posts/:id` - Fetch individual post
- `POST /posts` - Create new post
- `DELETE /posts/:id` - Delete post

## 🎓 Learning Resources

- [TanStack Query Documentation](https://tanstack.com/query/latest)
- [React Query Tutorial](https://react-query.tanstack.com/overview)
- [TanStack Query Examples](https://github.com/tannerlinsley/react-query/tree/master/examples)

## 🤝 Contributing

Feel free to contribute to this project by:
1. Forking the repository
2. Creating a feature branch
3. Making your changes
4. Submitting a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Happy coding with TanStack Query! 🎉**
