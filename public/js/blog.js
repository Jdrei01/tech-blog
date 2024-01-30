//Get the data from the user inputs and fetch the backend api for creating a new blog.
const createBlogHandler = async (e) => {
    e.preventDefault();
    const title = document.querySelector('#blog-title').value.trim();
    const content = document.querySelector('#blog-content').value.trim();
    if (title && content) {
      try {
        const response = await fetch('/api/blogs', {
          method: 'POST',
          body: JSON.stringify({ title, content }),
          headers: { 'Content-Type': 'application/json' },
        });
  
        if (response.ok) {
          document.location.replace('/dashboard');
        } else {
          alert('Failed to create.');
        }
      } catch (e) {
        alert('Failed to create.');
      }
    } else {
      alert('Fill out the form.');
    }
  };
  
  //Get the data from the user inputs and fetch the backend api for updating the blog.
  const updateBlogHandler = async (e) => {
    e.preventDefault();
    const title = document.querySelector('#blog-title').value.trim();
    const content = document.querySelector('#blog-content').value.trim();
    const id = +location.href.split('/')[location.href.split('/').length - 1];
    if (title && content) {
      try {
        const response = await fetch(`/api/blogs/${id}`, {
          method: 'PUT',
          body: JSON.stringify({ title, content }),
          headers: { 'Content-Type': 'application/json' },
        });
  
        if (response.ok) {
          document.location.replace('/dashboard');
        } else {
          alert('Failed to update.');
        }
      } catch (e) {
        alert('Failed to update.');
      }
    } else {
      alert('Fill out the form.');
    }
  };
  
  //Get the blog id from the url and fetch the backend api for deleting the blog.
  const deleteBlogHandler = async () => {
    const id = +location.href.split('/')[location.href.split('/').length - 1];
    try {
      const response = await fetch(`/api/blogs/${id}`, { method: 'DELETE' });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to delete.');
      }
    } catch (e) {
      alert('Failed to delete.');
    }
  };
  
  document
    .querySelector('#create-blog')
    ?.addEventListener('click', createBlogHandler);
  
  document
    .querySelector('#update-blog')
    ?.addEventListener('click', updateBlogHandler);
  
  document
    .querySelector('#delete-blog')
    ?.addEventListener('click', deleteBlogHandler);