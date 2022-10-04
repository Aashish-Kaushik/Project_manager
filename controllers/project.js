exports.projects = async () => {
  const snapshot = await db.collection("projects").get();
  snapshot.forEach((doc) => {
    return doc.id, "=>", doc.data();
  });
};
exports.createProjects = async () => {
  
};
