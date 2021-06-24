
(async () => {
    try {
      await sequelize.sync(
        { force: false } //Reset db every time
      );
      app.listen(port, () => console.log('Server running...'))
    } catch (error) {
      console.log(error);
    }
  })();