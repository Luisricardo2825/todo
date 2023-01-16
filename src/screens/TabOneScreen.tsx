import { StyleSheet, FlatList } from "react-native";

import { RootTabScreenProps } from "../types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Redux/Store";
import { TodoActions } from "../Redux/reducers/TodoReducer";
import {
  Button,
  Checkbox,
  HStack,
  Text,
  View,
  IconButton,
  Icon,
} from "native-base";
import { useEffect, useState } from "react";
import { Entypo } from "@expo/vector-icons";
import React from "react";

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  const todos = useSelector<RootState, RootState["todos"]>((state) =>
    state.todos
  );

  const dispatch = useDispatch();

  const addNewTodo =  () => {
    const title = "teste";
    const todo: Todo = {
      done: false,
      procastinated: false,
      passToNextDay: false,
      deleteAfter: 0,
      deleted: false,
      description: "teste",
      startDate: new Date().toLocaleDateString(),
      title,
    };
    dispatch({ data: todo, type: TodoActions.ADD });
  };

  useEffect(() => {
    console.log("Rendered");
  }, []);
  return (
    <View style={styles.container}>
      <Button onPress={addNewTodo}>Adicionar to-do</Button>
      {/* <Button onPress={removeAllTodo}>Remover todos os to-do's</Button> */}

      <FlatList
        data={todos}
        renderItem={({ item }) => <Item {...item} />}
        keyExtractor={(item) => String(item.id)}
      />
    </View>
  );
}

const Item = (item: Todo) => {
  const dispatch = useDispatch();

  const handleDone = (e: boolean) => {
    dispatch({ data: item, type: TodoActions.DONE });
  };

  const removeTodo = () => {
    dispatch({ data: item, type: TodoActions.DELETE });
  };
  return (
    <HStack
      w="90%"
      justifyContent="space-between"
      alignItems="center"
      key={item.id}
      aria-accessibilityLabel={`done-${item.title}`}
    >
      <Checkbox
        isChecked={item.done}
        value={String(item.title)}
        aria-label={`done-${item.title}`}
        onChange={handleDone}
      ></Checkbox>
      <Text
        width="100%"
        flexShrink={1}
        textAlign="left"
        mx="2"
        strikeThrough={item.done}
        _light={{
          color: item.done ? "gray.400" : "coolGray.800",
        }}
        _dark={{
          color: item.done ? "gray.400" : "coolGray.50",
        }}
        aria-accessibilityLabel={`done-${item.title}`}
      >
        {item.title} {String(item.deleted)}
      </Text>
      <IconButton
        size="sm"
        colorScheme="trueGray"
        icon={<Icon as={Entypo} name="minus" size="xs" color="trueGray.400" />}
        aria-accessibilityLabel={`done-${item.title}`}
        onPress={removeTodo}
      />
    </HStack>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
