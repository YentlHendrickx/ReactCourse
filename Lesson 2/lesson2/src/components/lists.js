export function ListArray({students}) {
  let listItems = [];
  for (var i = 0; i < students.length; i++) {
    listItems.push(<li key={students[i].id}>{students[i].name} {students[i].grade}</li>);
  }

  return (
    <ul>
      {listItems}
    </ul>
  );
}

export function ListMap({ students }) {
  const listItems = students.map(student =>
    <li key={student.id}>{student.name} {student.grade}</li>
  );

  return (
    <ol>
      {listItems}
    </ol>
  );
}
