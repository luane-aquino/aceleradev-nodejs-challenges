// Implementar o esquema de Animals, seguindo o proposto no README.md
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('animals', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
      autoIncrement: true
    },
    pet_name: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.TEXT
    },
    animal_type: {
      type: DataTypes.ENUM('gato', 'cachorro', 'outros')
    },
    pet_age: {
      type: DataTypes.INTEGER
    },
    pet_size: {
      type: DataTypes.ENUM('grande', 'médio', 'pequeno')
    },
    sex: {
      type: DataTypes.ENUM('macho', 'femea')
    },
    color: {
      type: DataTypes.STRING
    },
    image_url: {
      type: DataTypes.STRING
    }
  })
}