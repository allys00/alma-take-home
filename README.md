# Alma Take Home Project

Welcome to the Alma Take Home Project! This guide will help you set up and run the project on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [npm](https://www.npmjs.com/) (Node package manager)

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/allys00/alma-take-home.git
    ```

2. Navigate to the project directory:

    ```bash
    cd alma-take-home
    ```

3. Install the dependencies:

    ```bash
    npm install
    ```

## Running the Project

To start the project, run the following command:

```bash
npm dev
```

This will start the development server and you can view the project in your browser at `http://localhost:3000`.

## Routes

# /assessments 
# /login (email:admin@admin.com, password:admin)
# /leads (Private)


## Considerations

# Typescript: I always like to use TypeScript for projects, as it helps a lot with maintenance, productivity and fewer bugs.

# Redux: I used redux because it was requested, but for something simple like this, I would only use it to save the user and some details, otherwise I would use react query to maintain the data.

# Shadcn: Very good library for components as it has native usability and is very practical to use.

# React-Form-Hooks and yup together for forms, helps a lot in validation and error feedback

# Authentication: with more time I would have used the authentication suggested by next which is session cookies + middleware, but it takes a little longer to implement and as there was little time, I used something more practical.

# UI: base components are in lib/ui, and more robust or specific components are in lib.shared.

# Tailwind: Tailwind is a very good lib for maintaining standardized styling and productivity.
