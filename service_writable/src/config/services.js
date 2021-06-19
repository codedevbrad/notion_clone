module.exports = {
    
    cloudinaryConfig: ( ) => {
        return {
            cloud_name:  process.env.cloud_name,
            api_key:     process.env.cloud_key ,
            api_secret:  process.env.cloud_secret
        };
    }
}