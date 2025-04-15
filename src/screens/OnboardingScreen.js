import React from "react";
import {
  SafeAreaView,
  Image,
  StyleSheet,
  FlatList,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Dimensions,
} from "react-native";

const { width, height } = Dimensions.get("window");

const COLORS = { primary: "#C98B45", white: "#FDFDFC" };

const slides = [
  {
    id: "1",
    image: require("../../assets/FreshDonut.png"),
    title: "Fresh Handmade Donuts",
    subtitle: "Taste the difference — our donuts are made fresh every day with premium ingredients.",
  },
  {
    id: "2",
    image: require("../../assets/Order.png"),
    title: "Order & Pick-Up Fast",
    subtitle: "Skip the line! Pre-order your favorite donuts for quick pick-up or delivery.",
  },
];

const Slide = ({ item }) => {
  return (
    <View style={{ alignItems: "center" }}>
      <Image
        source={item?.image}
        style={{ height: "75%", width, resizeMode: "contain" }}
      />
      <View>
        <Text style={styles.title}>{item?.title}</Text>
        <Text style={styles.subtitle}>{item?.subtitle}</Text>
      </View>
    </View>
  );
};

const OnboardingScreen = ({ navigation }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
  const ref = React.useRef();

  const updateCurrentSlideIndex = (e) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };

  const goToNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex != slides.length) {
      const offset = nextSlideIndex * width;
      ref?.current.scrollToOffset({ offset });
      setCurrentSlideIndex(nextSlideIndex);
    }
  };

  const Footer = () => {
    return (
      <View style={styles.footerContainer}>
        <View style={styles.indicatorContainer}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                currentSlideIndex == index && {
                  backgroundColor: COLORS.white,
                  width: 25,
                },
              ]}
            />
          ))}
        </View>

        <View style={styles.btnContainer}>
          {currentSlideIndex == slides.length - 1 ? (
            <View style={styles.finalButtons}>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => navigation.navigate("About")}
              >
                <Text style={styles.btnText}>About us</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => navigation.navigate("Order")}
              >
                <Text style={styles.btnText}>Place the Order</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity onPress={goToNextSlide} style={styles.btn}>
              <Text style={styles.btnText}>NEXT</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.primary }}>
      <StatusBar backgroundColor={COLORS.primary} />
      <FlatList
        ref={ref}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        contentContainerStyle={{ height: height * 0.75 }}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={slides}
        pagingEnabled
        renderItem={({ item }) => <Slide item={item} />}
      />
      <Footer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 20,
    textAlign: "center",
  },
  subtitle: {
    color: COLORS.white,
    fontSize: 14,
    marginTop: 10,
    maxWidth: "70%",
    textAlign: "center",
    lineHeight: 20,
  },
  footerContainer: {
    height: height * 0.25,
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  indicator: {
    height: 2.5,
    width: 10,
    backgroundColor: "rgba(255,255,255,0.4)",
    marginHorizontal: 3,
    borderRadius: 2,
  },
  btnContainer: {
    marginBottom: 20,
  },
  finalButtons: {
    flexDirection: "column",
  },
  btn: {
    height: 50,
    borderRadius: 5,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  btnText: {
    fontWeight: "bold",
    fontSize: 15,
    color: COLORS.primary,
  },
});

export default OnboardingScreen;