import { Sequelize, DataTypes } from "sequelize"

export const initUserGroupModel = (connectionDb: Sequelize) => connectionDb.define('usergroup', {
    user_id: DataTypes.UUID,
    group_id: DataTypes.UUID,
})