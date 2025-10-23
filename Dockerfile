# Step 1: Use an official Nginx image
FROM nginx:stable-alpine


COPY ./ /usr/share/nginx/html

# Step 3: Expose port 80 for HTTP
EXPOSE 80

# Step 4: Start Nginx
CMD ["nginx", "-g", "daemon off;"]
