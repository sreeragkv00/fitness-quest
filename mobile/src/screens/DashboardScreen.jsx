import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native';
import { useSelector } from 'react-redux';
import { userAPI, questAPI, workoutAPI } from '../api/client';

const DashboardScreen = ({ navigation }) => {
  const user = useSelector(state => state.auth.user);
  const [stats, setStats] = useState(null);
  const [quests, setQuests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [statsRes, questsRes] = await Promise.all([
        userAPI.getStats(),
        questAPI.getDaily()
      ]);
      
      setStats(statsRes.data.data);
      setQuests(questsRes.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#6366f1" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Welcome back! 👋</Text>
        <Text style={styles.subtitle}>{user?.username}</Text>
      </View>

      {/* Stats Grid */}
      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{stats?.level}</Text>
          <Text style={styles.statLabel}>Level</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{stats?.streak}</Text>
          <Text style={styles.statLabel}>Streak</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{stats?.totalWorkouts}</Text>
          <Text style={styles.statLabel}>Workouts</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{stats?.totalMinutes}</Text>
          <Text style={styles.statLabel}>Minutes</Text>
        </View>
      </View>

      {/* Daily Quests */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📋 Daily Quests</Text>
        {quests.map(quest => (
          <View key={quest._id} style={styles.questCard}>
            <View style={styles.questInfo}>
              <Text style={styles.questTitle}>{quest.title}</Text>
              <Text style={styles.questDesc}>
                {quest.objective.target} {quest.objective.type}
              </Text>
            </View>
            <View style={styles.questReward}>
              <Text style={styles.rewardXP}>+{quest.reward.xp}</Text>
              <Text style={styles.rewardLabel}>XP</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Log Workout Button */}
      <TouchableOpacity
        style={styles.actionButton}
        onPress={() => navigation.navigate('LogWorkout')}
      >
        <Text style={styles.actionButtonText}>💪 Log Workout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  header: {
    backgroundColor: '#6366f1',
    padding: 20,
    paddingTop: 40
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5
  },
  subtitle: {
    fontSize: 16,
    color: '#e0e7ff'
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    gap: 10
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6366f1'
  },
  statLabel: {
    fontSize: 12,
    color: '#999',
    marginTop: 5
  },
  section: {
    padding: 15
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333'
  },
  questCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3
  },
  questInfo: {
    flex: 1
  },
  questTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333'
  },
  questDesc: {
    fontSize: 12,
    color: '#999',
    marginTop: 4
  },
  questReward: {
    alignItems: 'center'
  },
  rewardXP: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6366f1'
  },
  rewardLabel: {
    fontSize: 10,
    color: '#999',
    marginTop: 2
  },
  actionButton: {
    backgroundColor: '#6366f1',
    margin: 15,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center'
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  }
});

export default DashboardScreen;
