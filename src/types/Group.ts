type Permission = 'READ' | 'WRITE' | 'DELETE' | 'SHARE' | 'UPLOAD_FILES';

type Group = {
  id?: string;
  name: string;
  permissions: Array<Permission>;
};

type Groups = Array<Group>;

export { Permission, Group, Groups };
