import { StyleSheet } from "react-native";
import colors from "../utlis/Colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:colors.lightGray,
    paddingTop: 40,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  addTaskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    padding: 10,
    borderWidth: 2,
    borderColor: 'black',
    marginRight: 10,
    borderRadius: 8,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 4,
    elevation: 3,
  },
  taskText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
  },
  deleteButton: {
    color: 'red',
    fontWeight: 'bold',
  },
  editButton: {
    color: 'blue',
    fontWeight: 'bold',
    marginRight: 10,
  },
  emptyMessage: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
  },
  aboutButton: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 4,
    alignItems: 'center',
  },
  aboutText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default styles