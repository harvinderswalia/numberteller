import { supabase } from '../lib/supabase';

export interface SavedChart {
  id: string;
  user_auth_id: string;
  name: string;
  chart_data: any;
  created_at: string;
  updated_at: string;
}

const MAX_SAVED_CHARTS = 10;

export async function getSavedCharts(): Promise<SavedChart[]> {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return [];
  }

  const { data, error } = await supabase
    .from('saved_charts')
    .select('*')
    .eq('user_auth_id', user.id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching saved charts:', error);
    return [];
  }

  return data || [];
}

export async function saveChart(name: string, chartData: any): Promise<{ success: boolean; error?: string }> {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return {
      success: false,
      error: 'You must be signed in to save charts.'
    };
  }

  const existingCharts = await getSavedCharts();

  if (existingCharts.length >= MAX_SAVED_CHARTS) {
    return {
      success: false,
      error: `You can only save up to ${MAX_SAVED_CHARTS} charts. Please delete a chart to save a new one.`
    };
  }

  const { data, error } = await supabase
    .from('saved_charts')
    .insert({
      user_auth_id: user.id,
      name: name,
      chart_data: chartData
    })
    .select()
    .single();

  if (error) {
    console.error('Error saving chart:', error);
    return {
      success: false,
      error: 'Failed to save chart. Please try again.'
    };
  }

  return { success: true };
}

export async function deleteChart(chartId: string): Promise<{ success: boolean; error?: string }> {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return {
      success: false,
      error: 'You must be signed in to delete charts.'
    };
  }

  const { error } = await supabase
    .from('saved_charts')
    .delete()
    .eq('id', chartId)
    .eq('user_auth_id', user.id);

  if (error) {
    console.error('Error deleting chart:', error);
    return {
      success: false,
      error: 'Failed to delete chart. Please try again.'
    };
  }

  return { success: true };
}

export async function updateChartName(chartId: string, newName: string): Promise<{ success: boolean; error?: string }> {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return {
      success: false,
      error: 'You must be signed in to update charts.'
    };
  }

  const { error } = await supabase
    .from('saved_charts')
    .update({
      name: newName,
      updated_at: new Date().toISOString()
    })
    .eq('id', chartId)
    .eq('user_auth_id', user.id);

  if (error) {
    console.error('Error updating chart name:', error);
    return {
      success: false,
      error: 'Failed to update chart name. Please try again.'
    };
  }

  return { success: true };
}
