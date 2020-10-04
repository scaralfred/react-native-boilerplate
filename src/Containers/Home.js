import React, { useState } from 'react';
import { connect } from 'react-redux';
import GlobalActions from '../Redux/Global';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Text,
  StatusBar,
  Button,
} from 'react-native';

const Home = ({postsRequest}) => {

  const [posts, setPosts] = useState(null);

  return (
    <>
      <StatusBar barStyle="dark-content"/>
      <SafeAreaView style={{flex: 1}}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          contentContainerStyle={styles.scrollView}
        >
          <Text style={styles.text}>Header</Text>
          {posts ? 
            <Text>{posts[0]}</Text>
          : null}
        </ScrollView>
        <Button title="Fetch posts" onPress={postsRequest}/>
      </SafeAreaView>
    </>
  );
}

Home.options = {
  layout: { orientation: ['portrait'] },
  topBar: { visible: false, drawBehind: true }
}

const styles = StyleSheet.create({
  scrollView: {
  },
  text: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 30
  }
});

const mapStateToProps = state => {
  return {
    posts: state.global.posts,
    fetchingPosts: state.global.fetching
  }
}

const mapDispatchToProps = dispatch => { 
  return {
    postsRequest: () => dispatch(GlobalActions.postsRequest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
